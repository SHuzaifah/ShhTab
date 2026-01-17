const STYLE_ID = "shhtab-styles";

chrome.storage.local.get(["studyMode"], (result) => {
  const existingStyle = document.getElementById(STYLE_ID);

  if (result.studyMode) {
    if (!existingStyle) {
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.innerHTML = `
        ytd-rich-grid-renderer,
        #comments,
        ytd-mini-guide-renderer {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    }
  } else {
    if (existingStyle) {
      existingStyle.remove();
    }
  }
});
