import {getStorage, notify} from "./utils/util";

window.onload = async () => {
    /*設定フォーム*/
    const endpointURL = document.getElementById("endpointURL") as HTMLSelectElement;
    const targetCardNumber = document.getElementById("targetCardNumber")as HTMLInputElement;

    endpointURL.addEventListener("change", async () => {
        await browser.storage.local.set({"endpointURL": endpointURL.value});
        notify(`設定を保存しました! リクエスト先URL:${endpointURL.value}`);
    });

    targetCardNumber.addEventListener("change", async () => {
        await browser.storage.local.set({"targetCardNumber": targetCardNumber.value});
        notify(`設定を保存しました! 自分のカード番号:${targetCardNumber.value}`);
    });
};