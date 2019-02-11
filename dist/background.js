
const endpoint = browser.storage.local.get("endpoint") || "http://connectouch.org";

/*以下のカードに関するイベントを対象とする*/
const observeCardID = browser.storage.local.get("cardID") || "010104128215612b";

/*JSONを保存して格納する*/
const osusumeList　= [];

/*取得したlinksをローカルの配列として保持する*/
const storedLinks = [];

/*参加者情報のテーブルを取ってくる*/
const userInfoTable　= [];

/*参加者のプロフィールを取ってくる関数*/
const getUserInfo = async () => {
    const endPointUrl = `${endpoint}/info`;

    const response = await get(endPointUrl, {});
    const infoLinks = response.data;

    infoLinks.forEach(item => {
        userInfoTable.push(item);
    });
};

/*ポーリングする関数*/
const pollingLinks = () => {
    /*Paramsにidを追加しない場合全てのリーダーのイベントを取得できる*/
    const endPointUrl = `${endpoint}/links?limit=100`;
    //const request = await fetch(endPointUrl, {mode: 'cors'});
    fetch(endPointUrl)
        .then(response => response.json())
        .then(data => {
            const loadedLinks = data;

            /*新しく追加されたLinksを求める*/
            getDiff(storedLinks, loadedLinks);
            /*ローカルの配列を新しい配列に上書きする*/
            storedLinks.length = 0;
            Object.assign(storedLinks, loadedLinks);
        })
        .catch(error => {
            console.log(error);
        })
};

/*新旧の配列の差分を取得する関数*/
const getDiff = (oldLinks, newLinks) => {
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

    if (diffLinks.length !== 0 && diffLinks.length < 2) {
        notify(`新しいタッチイベントが${diffLinks.length}件発生しました!`);

        /*例えば自分が1番の場合は監視するフィルタも作れる*/
        diffLinks.forEach(async link => {
            if (link.cardId === observeCardID) {
                notify(`新しいタッチイベントが発生しました!`);
            }
        })
    }

};


const notify = (message) => {
    console.log("background script makes notification!");
    const title = "notificationTitle";
    browser.notifications.create({
        "type": "basic",
        "iconUrl": browser.extension.getURL("icons/icon.png"),
        "title": title,
        "message": message
    });
};

setInterval(() => {
    //notify("Hello");
    pollingLinks();
}, 1000);

//browser.runtime.onInstalled.addListener(notify);