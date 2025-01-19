document.addEventListener("DOMContentLoaded", () => {
  async function getActiveTabId() {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
          reject("No active tab found.");
        } else {
          resolve(tabs[0].id);
        }
      });
    });
  }

  document.getElementById("start-tracking").addEventListener("click", async () => {
    try {
      const tabId = await getActiveTabId();
      if (typeof tabId !== "number" || isNaN(tabId)) {
        throw new Error("Invalid tabId: Expected an integer");
      }
      
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["content.js"]
      });
      document.getElementById("status").textContent = "Status: Tracking...";
    } catch (error) {
      console.error("Error starting tracking:", error);
    }
  });

  document.getElementById("stop-tracking").addEventListener("click", async () => {
    try {
      const tabId = await getActiveTabId();
      if (typeof tabId !== "number" || isNaN(tabId)) {
        throw new Error("Invalid tabId: Expected an integer");
      }
      
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: () => {
          if (window.webgazer) {
            window.webgazer.end();
            console.log("WebGazer stopped.");
          }
        }
      });
      document.getElementById("status").textContent = "Status: Not Tracking";
    } catch (error) {
      console.error("Error stopping tracking:", error);
    }
  });
});
