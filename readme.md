# Toggle Javascript

Quickly enable or disable JavaScript per site with a single click using this lightweight tool for easy debugging and privacy.

## Changelog

### 2.3.0
- reverted immediate toolbar icon updates during toggle
- restored previous icon refresh behavior to avoid flicker during page reload
- keeps toolbar icon updates handled by tab activation and page load events

### 2.2.0
- improved toolbar icon responsiveness when toggling JavaScript
- updates the active tab icon immediately after changing the site setting
- keeps icon feedback more consistent before the page reload completes

### 2.1.0
- improved toolbar icon accuracy when switching between tabs
- added `chrome.tabs.onActivated` listener to refresh icon state on active tab change
- improved tab id safety check using `tab.id == null` for better MV3 reliability

### 2.0.0
- updated background script to use modern Promise-based APIs for Manifest V3
- fixed issue where JavaScript toggle stopped working in recent Chrome releases
- added proper handling of non-http/https pages to prevent console errors
- general code cleanup for stability and future-proofing

### 1.0.0
- initial release
- enable or disable javascript per site with one click
- lightweight codebase with no background activity
- toolbar icon dynamically updates to reflect javascript status
- minimal permissions required (tabs, contentSettings)
- does not track, log, or analyze browsing behavior
- uses Chrome's built-in site settings (no custom storage)
- works offline without any external communication
- does not inject code (purely manages browser settings)
- extremely small footprint (minimal memory and CPU usage)
- uses contentSettings API instead of intrusive scripting
