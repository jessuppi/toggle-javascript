// icon paths for toolbar button
const ICON_JS_ENABLED = "icon-js-enabled.png"
const ICON_JS_DISABLED = "icon-js-disabled.png"

// get current javascript setting for the given url
async function getJsSettingForUrl(url) {
  return chrome.contentSettings.javascript.get({ primaryUrl: url })
}

// update javascript setting for a given domain pattern
async function setJsSettingForPattern(pattern, setting) {
  return chrome.contentSettings.javascript.set({
    primaryPattern: pattern,
    setting
  })
}

// toggle javascript on click for the active tab
chrome.action.onClicked.addListener(async (tab) => {
  if (!tab || !tab.url || !tab.id) return

  // extract domain from http/https urls only
  let domain
  try {
    const url = new URL(tab.url)
    if (url.protocol !== "http:" && url.protocol !== "https:") return
    domain = url.hostname
  } catch {
    return
  }

  // toggle javascript permission and reload tab
  try {
    const details = await getJsSettingForUrl(tab.url)
    const isEnabled = details.setting !== "block"
    await setJsSettingForPattern(`*://${domain}/*`, isEnabled ? "block" : "allow")
    chrome.tabs.reload(tab.id)
  } catch (error) {
    console.error("error toggling javascript:", error)
  }
})


// update icon when tab finishes loading
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete" || !tab || !tab.url) return

  // handle http/https urls only
  try {
    const url = new URL(tab.url)
    if (url.protocol !== "http:" && url.protocol !== "https:") return
  } catch {
    return
  }

  // set correct icon based on current javascript permission
  try {
    const details = await getJsSettingForUrl(tab.url)
    const isEnabled = details.setting !== "block"
    await chrome.action.setIcon({
      tabId,
      path: isEnabled ? ICON_JS_ENABLED : ICON_JS_DISABLED
    })
  } catch (error) {
    console.error("error updating javascript icon:", error)
  }
})

