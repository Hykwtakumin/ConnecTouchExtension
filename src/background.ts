
/*アクセスするサーバー*/
import {CardInfo, ConnecTouchLink, OsusumeJson} from "./utils/type";
import {get} from "./utils/util";

//const endpoint = browser.storage.local.get("endpoint") || "http://connectouc.org";
const endpoint = "http://connectouch.org";

/*以下のカードに関するイベントを対象とする*/
//const observeCardID = browser.storage.local.get("cardID") || "010104128215612b";
const observeCardID = "010104128215612b";

/*JSONを保存して格納する*/
const osusumeList: Array<OsusumeJson> = [];

/*取得したlinksをローカルの配列として保持する*/
const storedLinks: Array<ConnecTouchLink> = [];

/*参加者情報のテーブルを取ってくる*/
const userInfoTable: Array<CardInfo> = [];

/*参加者のプロフィールを取ってくる関数*/
const getUserInfo = async () => {
    const endPointUrl = `${endpoint}/info`;

    const response = await get(endPointUrl, {});
    const infoLinks = response.data as Array<CardInfo>;

    infoLinks.forEach(item => {
        userInfoTable.push(item);
    });
};

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
    const diffLinks = newLinks.reduce((prev, curr) => {
        if (!isContained(curr)) {
            prev.push(curr)
        }
        return prev
    }, []);

    if (diffLinks.length != 0 && diffLinks.length < 2) {
        notify(`新しいタッチイベントが${diffLinks.length}件発生しました!`);

        /*例えば自分が1番の場合は監視するフィルタも作れる*/
        diffLinks.forEach(async link => {
            if (link.cardId === observeCardID) {
                notify(`新しいタッチイベントが発生しました!`);
            }
            /*リーダーIDが自分のIDと一致する場合*/
            /*カードIDが自分のIDと一致する場合*/
            // if (link.link[0] === observeReaderId) {
            //     console.log(`${link.link[1]}が私にタッチした!`);
            //     const filteredList = await this.filterList(link.link[1]);
            //     console.dir(filteredList);
            //     if (filteredList.length === 0) {
            //         /*推薦するものが無ければ特に何もしない*/
            //     } else {
            //         this.notificate("新しいタッチイベントを検出しました!");
            //     }
            // }
        })
    }

};


const notify = (message: string) => {
    console.log("background script makes notification!");
    const title = "ConnecTouchからのお知らせ";
    browser.notifications.create({
        "type": "basic",
        "iconUrl": browser.extension.getURL("icons/icon.png"),
        "title": title,
        "message": message
    });
};

setInterval(() => {
    pollingLinks();
}, 1000);

//browser.runtime.onInstalled.addListener(notify);