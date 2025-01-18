document.getElementById("start-tracking").addEventListener("click", () => {
    chrome.scripting.executeScript({
      target: { tabId: getActiveTabId() },
      func: () => webgazer.begin()
    });
    document.getElementById("status").textContent = "Status: Tracking...";
  });
  
  document.getElementById("stop-tracking").addEventListener("click", () => {
    chrome.scripting.executeScript({
      target: { tabId: getActiveTabId() },
      func: () => webgazer.end()
    });
    document.getElementById("status").textContent = "Status: Not Tracking";
  });
  
  function getActiveTabId() {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        resolve(tabs[0].id);
      });
    });
  }
  