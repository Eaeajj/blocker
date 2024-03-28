// import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';

// reloadOnUpdate('pages/background');

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
// reloadOnUpdate('pages/content/style.scss');

chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
  // Check if the URL change is relevant to your extension

  chrome.tabs.sendMessage(details.tabId, {
    type: 'URL_CHANGE',
    url: details.url,
  });
});
