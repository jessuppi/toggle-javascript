const ICON_ON = "icon-on.png";
const ICON_OFF = "icon-off.png";

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.url || !tab.id) return;

  const url = new URL(tab.url);
  const domain = url.hostname;

  chrome.storage.local.get(domain, (data) => {
    const jsEnabled = !data[domain];

    chrome.contentSettings.javascript.set({
      primaryPattern: `*://${domain}/*`,
      setting: jsEnabled ? "allow" : "block"
    });

    chrome.storage.local.set({ [domain]: !jsEnabled });

    chrome.action.setIcon({
      tabId: tab.id,
      path: jsEnabled ? ICON_ON : ICON_OFF
    });

    chrome.tabs.reload(tab.id);
  });
});
