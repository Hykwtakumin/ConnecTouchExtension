import axios,  {AxiosResponse} from "axios";
import {ConnecTouchLink} from "./type";
import StorageObject = browser.storage.StorageObject;
import StorageValue = browser.storage.StorageValue;

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
        Accept: "application/text/plain",
        "Content-Type": "application/text/plain",
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