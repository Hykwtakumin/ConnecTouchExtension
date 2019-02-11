import axios,  {AxiosResponse} from "axios";
import {ConnecTouchLink} from "./type";

/*利用者のkeywordsと店のkeywordsとの間で共通するものを返す関数*/
export const isKeyWordContained = async (userWords: Array<string>, shopWords: Array<string>): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        userWords.forEach(word => {
            if (shopWords && shopWords.includes(word)) {
                resolve(true);
            }
        });
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