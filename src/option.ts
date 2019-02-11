import {getStorage, notify, setStorage} from "./utils/util";

window.onload = async () => {
    /*設定フォーム*/
    const endpointURL = document.getElementById("endpointURL") as HTMLFormElement;
    const targetCardNumber = document.getElementById("targetCardNumber")as HTMLFormElement;


    /*設定確認要素*/
    const currentURL = document.getElementById("currentURL");
    const currentNumber = document.getElementById("currentNumber");

    const localURL = await getStorage("endpointURL");
    const localCardNumber = await getStorage("targetCardNumber");

    if (localURL[0]) {
        currentURL.innerText = localURL[0];
    } else {
        currentURL.innerText = "http://connectouch.org";
    }

    if (localCardNumber[0]) {
        currentNumber.innerText = localCardNumber[0];
    }

    // const currentURLValue = await browser.storage.local.get("endpointURL");
    // const currentNumberValue = await browser.storage.local.get("targetCardNumber");

    /*設定ボタン*/
    const applyButton = document.getElementById("applyButton");

    const storeSettingsToLocal = async () => {
        await setStorage("endpointURL", endpointURL.value);
        await setStorage("targetCardNumber", targetCardNumber.value);
        notify("設定を保存しました!");
    };

    applyButton.addEventListener("click", storeSettingsToLocal);

    /*変化したら表示値も変える*/
    browser.storage.onChanged.addListener(changes => {
        for (let key in changes) {
            console.dir(key);
            if (key === "endpointURL") {
                currentURL.innerText = changes[key].newValue;
            } else if (key === "targetCardNumber") {
                currentNumber.innerText = changes[key].newValue;
            }
        }
    });
};