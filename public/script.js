import getDate from "./helper/getDate.js";

async function getCurrentTabInfo() {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

  const tabId = tab.id;
  const tabUrl = tab.url;
  return { tabId, tabUrl };
}

document.getElementById("scrape-button").addEventListener("click", async () => {
  const userNotes = document.getElementById("notes").value;
  console.log("user notes:", userNotes);

  const { tabId, tabUrl } = await getCurrentTabInfo();
  const urlWithoutProtocol = tabUrl.split("https://")[1];
  const url = urlWithoutProtocol.split("/description/")[0]
  console.log(url)


  const date = getDate();
  console.log("getDate", date);
});
