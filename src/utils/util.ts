import axios,  {AxiosResponse} from "axios";
import {CardInfo, ConnecTouchLink} from "./type";
import StorageObject = browser.storage.StorageObject;
import StorageValue = browser.storage.StorageValue;
import {rejects} from "assert";

/*２つの文字列配列の中に共通するものがあるかbooleanで返す関数*/
export const isKeyWordContained = async (formerWords: Array<string>, latterWords: Array<string>): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        formerWords.forEach(word => {
            if (latterWords && latterWords.includes(word)) {
                resolve(true);
            }
        });
    });
};

export const notify = (message: string) => {
    const title = "ConnecTouchからのお知らせ";
    browser.notifications.create({
        "type": "basic",
        "iconUrl": browser.extension.getURL("icons/icon.png"),
        "title": title,
        "message": message
    });
};

export const client = axios.create({
    timeout: 5000,
    withCredentials: false,
    validateStatus: _ => true,
    headers: {
        Accept: "application/json, application/text/plain",
        "Content-Type": "application/text/plain, application/json, application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":"Content-Type",
        "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE"
    }
});

export function get(url: string, Params: any): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>((resolve, reject) => {
        client
            .get(url, { params: Params })
            .then(response => {
                resolve(response);
            })
            .catch(response => {
                reject(response);
            });
    });
}

export function post(url: string, Params: any): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>((resolve, reject) => {
        client
            .post(url, { params: Params })
            .then(response => {
                resolve(response);
            })
            .catch(response => {
                reject(response);
            });
    });
}

export function put(url: string, Params: any): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>((resolve, reject) => {
        client
            .put(url, { params: Params })
            .then(response => {
                resolve(response);
            })
            .catch(response => {
                reject(response);
            });
    });
}

export function delete_req(url: string, Params: any): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>((resolve, reject) => {
        client
            .delete(url, { params: Params })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export const getStorage = (key: string): Promise<StorageValue> => {
    return new Promise( async (resolve, reject) => {
        try {
            const localData = await browser.storage.local.get(key) as StorageObject;
            resolve(Object.values(localData));
        } catch (e) {
            reject(e);
        }
    });
};

/*参加者のプロフィールを取ってくる関数*/
export const getUserInfo = async (cardId : string):Promise<CardInfo> => {
    const endPointUrl = `http://192.168.0.200/info`;

    return new Promise( async (resolve, reject) => {
        const response = await get(endPointUrl, {});
        const infoLinks = response.data as Array<CardInfo>;

        const info =  infoLinks.find(item => {
            return item.id === cardId
        });
        resolve(info);
    });
};

/*リーダーの情報を取ってくる関数*/
export const getReaderInfo = async (readerId: string): Promise<string> => {
    //readerTable.json
    const endPointUrl = `http://192.168.0.200/readerTable.json`;
    return new Promise( async (resolve, reject) => {
        const response = await get(endPointUrl, {});
        const readerInfos = response.data;

        const reader = readerInfos.find(item => {
            return item.id === readerId
        });
        resolve(reader.desc);
    });
};
/*カード番号からcardIDを解決する関数*/
export const resolveCardIdByNumber = (cardNumber: number): string => {
    if (cardNumber == 11) {
        return "01120112661ac512";
    } else if (cardNumber == 12) {
        return "01120212661ad012";
    } else if (cardNumber == 13) {
        return "01120212661af412";
    } else if (cardNumber == 14) {
        return "01120112661aea12";
    } else if (cardNumber == 15) {
        return "01120212661af512";
    } else if (cardNumber == 16) {
        return "01120112661aeb12";
    } else if (cardNumber == 17) {
        return "01120212661af612";
    } else if (cardNumber == 18) {
        return "01120112661af212";
    } else if (cardNumber == 19) {
        return "01120212661afd12";
    } else if (cardNumber == 20) {
        return "01120112661af312";
    } else if (cardNumber == 21) {
        return "010104128215612b";
    }
};
