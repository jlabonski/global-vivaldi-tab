const openOptions = {
  focused: true,
  url: 'about:blank',
  focused: true
};

const incognitoOptions = {
  ...openOptions,
  incognito: true
};

const refocus = (win) => {
  chrome.windows.update(win.id, { focused: true });
}

chrome.commands.onCommand.addListener(function(command) {
  if (command === 'new-tab') {
    // First we need to focus the current window
    // otherwise the new tab won't have the cursor in the OmniBar
    chrome.windows.getCurrent({}, function(win){
      chrome.windows.update(win.id, {focused: true}, function() {
        chrome.tabs.create({});
      });
    });
  } else if (command === 'new-window') {
    chrome.windows.create(openOptions, refocus);
  } else if (command === 'new-incognito-window') {
    // If you use this, you need to check "Allow in incognito" checkbox of the
    // extension
    chrome.windows.create(incognitoOptions, refocus);
  }
});
