"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
/*利用者のkeywordsと店のkeywordsとの間で共通するものを返す関数*/
exports.isKeyWordContained = (userWords, shopWords) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        userWords.forEach(word => {
            if (shopWords && shopWords.includes(word)) {
                resolve(true);
            }
        });
    });
});
exports.client = axios_1.default.create({
    timeout: 5000,
    withCredentials: false,
    validateStatus: _ => true,
    headers: {
        Accept: "application/text/plain",
        "Content-Type": "application/text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE"
    }
});
function get(url, Params) {
    return new Promise((resolve, reject) => {
        exports.client
            .get(url, { params: Params })
            .then(response => {
            resolve(response);
        })
            .catch(response => {
            reject(response);
        });
    });
}
exports.get = get;
function post(url, Params) {
    return new Promise((resolve, reject) => {
        exports.client
            .post(url, { params: Params })
            .then(response => {
            resolve(response);
        })
            .catch(response => {
            reject(response);
        });
    });
}
exports.post = post;
function put(url, Params) {
    return new Promise((resolve, reject) => {
        exports.client
            .put(url, { params: Params })
            .then(response => {
            resolve(response);
        })
            .catch(response => {
            reject(response);
        });
    });
}
exports.put = put;
function delete_req(url, Params) {
    return new Promise((resolve, reject) => {
        exports.client
            .delete(url, { params: Params })
            .then(response => {
            resolve(response);
        })
            .catch(error => {
            reject(error);
        });
    });
}
exports.delete_req = delete_req;
//# sourceMappingURL=util.js.map