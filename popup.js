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
      console.log("Tab ID:", tabId);
      if (typeof tabId !== "number" || isNaN(tabId)) {
        throw new Error("Invalid tabId: Expected an integer");
      }
      
      await chrome.scripting.executeScript({
        // target: { tabId: tabId },
        // func: () => {
        //   console.log("Executing WebGazer script on active tab...");

        //   try {
        //     if (!window.webgazerInitialized) {
        //       window.webgazerInitialized = true;
        //       console.log("Initializing WebGazer...");
              
        //       const script = document.createElement("script");
        //       script.src = chrome.runtime.getURL("webgazer.js");
        //       document.head.appendChild(script);
              
        //       script.onload = () => {
        //         console.log("WebGazer.js loaded successfully from local file.");
        //         navigator.mediaDevices.getUserMedia({ video: true })
        //           .then(() => {
        //             console.log("Camera access granted");
        //             webgazer.begin();
        //             console.log("WebGazer has started tracking.");
        //             webgazer.setGazeListener((data) => {
        //               if (!data) {
        //                 console.log("No gaze data detected.");
        //                 return;
        //               }
        //               console.log(`Gaze Coordinates: X=${data.x}, Y=${data.y}`);
                      
        //               const screenWidth = window.innerWidth;
        //               const screenHeight = window.innerHeight;
        //               const x = data.x;
        //               const y = data.y;
                      
        //               if (x < 0 || x > screenWidth || y < 0 || y > screenHeight) {
        //                 console.log("Gaze detected off-screen, pausing video");
        //                 document.querySelectorAll("video").forEach(video => video.pause());
        //               } else {
        //                 console.log("Gaze on-screen, resuming video");
        //                 document.querySelectorAll("video").forEach(video => video.play());
        //               }
        //             }).begin();
        //           })
        //           .catch((error) => {
        //             console.error("Camera access denied", error);
        //           });
        //       };
        //       script.onerror = () => {
        //         console.error("Failed to load WebGazer.js");
        //       };
        //     } else {
        //       console.log("WebGazer is already initialized.");
        //     }
        //   } catch (e) {
        //     console.error("Error inside executeScript:", e);
        //   }
        // }
      }).catch(error => console.error("Error executing script:", error));
      console.log("get here?");

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
            webgazer.end();
            console.log("WebGazer stopped.");
          }
        }
      }).catch(error => console.error("Error executing stop script:", error));
      document.getElementById("status").textContent = "Status: Not Tracking";
    } catch (error) {
      console.error("Error stopping tracking:", error);
    }
  });
});
