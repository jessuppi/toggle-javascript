const ICON_JS_ENABLED = "icon-js-enabled.png"
const ICON_JS_DISABLED = "icon-js-disabled.png"

chrome.action.onClicked.addListener((tab) => {
  // validate the tab and its url
  if (!tab || !tab.url || !tab.id) return

  // extract domain from the tab url
  let domain
  try {
    const url = new URL(tab.url)
    domain = url.hostname
  } catch (error) {
    // skip if the url is invalid or unsupported like chrome:// or about:blank
    return
  }

  // get current javascript permission for the site
  chrome.contentSettings.javascript.get({ primaryUrl: tab.url }, (details) => {
    const isEnabled = details.setting !== "block"

    // toggle the javascript permission
    chrome.contentSettings.javascript.set({
      primaryPattern: `*://${domain}/*`,
      setting: isEnabled ? "block" : "allow"
    })

    // update the toolbar icon
    chrome.action.setIcon({
      tabId: tab.id,
      path: isEnabled ? ICON_JS_DISABLED : ICON_JS_ENABLED
    })

    // reload the current tab
    chrome.tabs.reload(tab.id)
  })
})
