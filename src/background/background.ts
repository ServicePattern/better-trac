import browser from 'webextension-polyfill';
import { setPendingOptionsPageTask } from '../pendingOptionsPageTask';

(browser.browserAction || browser.action).onClicked.addListener(() => {
  browser.runtime.openOptionsPage();
});

browser.runtime.onMessage.addListener(async (message) => {
  if (message && message.type === 'openOptionsPage') {
    await setPendingOptionsPageTask(message.data)
    browser.runtime.openOptionsPage();
  }
});
