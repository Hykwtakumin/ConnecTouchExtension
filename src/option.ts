window.onload = async () => {
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

    const storeSettingsToLocal = async () => {
        await browser.storage.local.set({"endpointURL": endpointURL.innerText});
        await browser.storage.local.set({"targetCardNumber": targetCardNumber.innerText});
        alert("設定を保存しました!");
    };

    applyButton.addEventListener("click", storeSettingsToLocal)
};