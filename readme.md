# Toggle Javascript

Quickly enable or disable JavaScript per site with a single click using this lightweight tool for easy debugging and privacy.

## Changelog

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
