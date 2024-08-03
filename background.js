chrome.runtime.onInstalled.addListener(() => {
    console.log('Auto Scroll Extension installed.');

    chrome.contextMenus.create({
        id: "autoScroll",
        title: "Auto Scroll Settings",
        contexts: ["all"]
      });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "autoScroll") {
      chrome.action.openPopup();
    }
  });
  