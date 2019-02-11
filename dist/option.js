(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
window.onload = () => __awaiter(this, void 0, void 0, function* () {
    /*設定フォーム*/
    const endpointURL = document.getElementById("endpointURL");
    const targetCardNumber = document.getElementById("targetCardNumber");
    /*設定確認要素*/
    // const currentURL = document.getElementById("currentURL");
    // const currentNumber = document.getElementById("currentNumber");
    // const currentURLValue = await browser.storage.local.get("endpointURL");
    // const currentNumberValue = await browser.storage.local.get("targetCardNumber");
    /*設定ボタン*/
    const applyButton = document.getElementById("applyButton");
    const storeSettingsToLocal = () => __awaiter(this, void 0, void 0, function* () {
        yield browser.storage.local.set({ "endpointURL": endpointURL.innerText });
        yield browser.storage.local.set({ "targetCardNumber": targetCardNumber.innerText });
        alert("設定を保存しました!");
    });
    applyButton.addEventListener("click", storeSettingsToLocal);
});

},{}]},{},[1]);
