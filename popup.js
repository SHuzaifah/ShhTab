const button = document.getElementById("toggle");

// Load saved state when popup opens
chrome.storage.local.get(["studyMode"], (result) => {
  const isOn = result.studyMode || false;
  updateButton(isOn);
});

button.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0].url;
    if (url.startsWith("chrome://")) return;

    chrome.storage.local.get(["studyMode"], (result) => {
      const newState = !result.studyMode;
      chrome.storage.local.set({ studyMode: newState }, () => {
        updateButton(newState);

        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ["content.js"]
        });
      });
    });
  });
});

// UI state handler (THIS is what you asked about)
function updateButton(isOn) {
  button.textContent = isOn ? "ON" : "OFF";
  button.className = isOn ? "on" : "off";
}
