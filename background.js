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

  // retrieve the stored javascript setting
  chrome.storage.local.get(domain, (stored) => {
    const isDisabled = Boolean(stored[domain])
    const isEnabled = !isDisabled

    // set javascript permission for the domain
    chrome.contentSettings.javascript.set({
      primaryPattern: `*://${domain}/*`,
      setting: isEnabled ? "allow" : "block"
    })

    // save the updated toggle state
    chrome.storage.local.set({ [domain]: !isEnabled })

    // update the toolbar icon
    chrome.action.setIcon({
      tabId: tab.id,
      path: isEnabled ? ICON_JS_ENABLED : ICON_JS_DISABLED
    })

    // reload the current tab
    chrome.tabs.reload(tab.id)
  })
})
