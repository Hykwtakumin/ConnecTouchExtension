/*アクセスするサーバー*/
import {CardInfo, ConnecTouchLink, OsusumeJson} from "./utils/type";
import {get, getReaderInfo, getUserInfo, isKeyWordContained, notify, resolveCardIdByNumber} from "./utils/util";

//const endpoint = browser.storage.local.get("endpoint") || "http://connectouc.org";
// let endpoint = "http://connectouch.org";
let endpoint = "http://192.168.0.200";

/*以下のカードに関するイベントを対象とする*/
//const observeCardID = browser.storage.local.get("cardID") || "010104128215612b";
let observeCardID = "010104128215612b";

let cardNumber = 21;

/*JSONを保存して格納する*/
const osusumeList: Array<OsusumeJson> = [];

/*取得したlinksをローカルの配列として保持する*/
const storedLinks: Array<ConnecTouchLink> = [];

/*参加者情報のテーブルを取ってくる*/
const userInfoTable: Array<CardInfo> = [];

/*ポーリングする関数*/
const pollingLinks = async () => {
    /*Paramsにidを追加しない場合全てのリーダーのイベントを取得できる*/
    const endPointUrl = `${endpoint}/links?limit=100`;
    const request = await get(endPointUrl, {});
    const loadedLinks: Array<ConnecTouchLink> = request.data;
    /*新しく追加されたLinksを求める*/
    this.getDiff(storedLinks, loadedLinks);
    /*ローカルの配列を新しい配列に上書きする*/
    storedLinks.length = 0;
    Object.assign(storedLinks, loadedLinks);
};

/*新旧の配列の差分を取得する関数*/
export const getDiff = (oldLinks: Array<ConnecTouchLink>, newLinks: Array<ConnecTouchLink>) => {
    /*newLinksにあってoldLinksに無いものは新しいものとする*/
    /*あるかないかの確認はmongoDBのレコードIdを元に行う*/
    const oldIdArray = oldLinks.map(link => link._id.$oid);

    /*レコードIdを元に存在しているかを真偽値で返す関数*/
    const isContained = (link) => {
        return oldIdArray.includes(link._id.$oid);
    };

    /*newLinksにあってoldLinksに無いものだけを集めた配列を作る*/
    const diffLinks : ConnecTouchLink[] = newLinks.reduce((prev, curr) => {
        if (!isContained(curr)) {
            prev.push(curr)
        }
        return prev
    }, []);

    if (diffLinks.length != 0 && diffLinks.length < 2) {
        console.log(`新しいタッチイベントが発生しました!`);
        diffLinks.forEach(async(link) => {
            console.dir(link);
            console.log(`link.id : ${link.link[1]}`);
            console.log(`observeCardID : ${observeCardID}`);
            if (link.link[0] === "signagePhoto") {
                /*サイネージストーリーの時も分岐させる*/
                if (link.link[1] !== observeCardID) {
                    const me = await getUserInfo(observeCardID);
                    const you = await getUserInfo(diffLinks[0].link[1]);
                    if (isKeyWordContained(me.secrets, you.secrets)) {
                        notify(`${you.email}が新しい写真を撮影しました!`);
                    }
                }
            } else {
                //自分のイベントは通知しない
                if (link.link[1] !== observeCardID) {
                    const me = await getUserInfo(observeCardID);
                    const you = await getUserInfo(diffLinks[0].link[1]);
                    const readerName = await getReaderInfo(link.link[0]);
                    if (await isKeyWordContained(me.secrets, you.secrets)) {
                        notify(`${you.email}が${readerName}にタッチしました!`);
                    }
                }
            }
        });
    }

};


browser.storage.onChanged.addListener( async (changes) => {
    console.dir(changes);
    for (let key in changes) {
        console.dir(changes);
        if (key === "endpointURL") {
            endpoint = changes[key].newValue;
            console.log(`endpoint : ${endpoint}`);
        } else if (key === "targetCardNumber") {
            cardNumber = changes[key].newValue;
            console.log(`cardNumber : ${cardNumber}`);
            observeCardID = resolveCardIdByNumber(cardNumber)
        }
    }
});

setInterval(() => {
    pollingLinks();
}, 1000);

//browser.runtime.onInstalled.addListener(notify);