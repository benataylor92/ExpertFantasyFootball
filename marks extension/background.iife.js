(function() {
    "use strict";
  
    (async () => {
      chrome.runtime.onMessage.addListener((e, s, t) => {
        if (e.type === "settings") {
          chrome.storage.local.set({ ...e });
        }
      });
  
      chrome.tabs.onUpdated.addListener(async (e, s, t) => {
        console.log("addListener");
        if (s.status === "complete" && t.url.indexOf("://fantasy.premierleague.com/") !== -1) {
          await a(e);
        }
      });
  
      let a = async e => {
        const s = chrome.runtime.getURL("test_fixtures.json");
        var t = await chrome.storage.local.get(["userRatings", "zoom", "gameweeks", "playerList"]);
        chrome.tabs.sendMessage(e, {
          messageType: "install",
          tabId: e,
          fakeFixturesUrl: s,
          settings: t
        });
      };
    })();
  })();