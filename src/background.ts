
function notify() {
    console.log("background script makes notification!");
    var title = "notificationTitle";
    var content = "Add-on Installed!";
    browser.notifications.create({
        "type": "basic",
        "iconUrl": browser.extension.getURL("icons/icon.png"),
        "title": title,
        "message": content
    });
}

setInterval(() => {
    notify();
}, 1000);

/*
Assign `notify()` as a listener to messages from the content script.
*/



browser.runtime.onInstalled.addListener(notify);