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
  const url = urlWithoutProtocol.split("/description/")[0];

  const date = getDate();

  function scrapeLeetCode() {
    console.log("script injected");

    const title = document.querySelector(".text-title-large")?.innerText;

    const difficulty = document.querySelector(".flex.gap-1 > div.relative.inline-flex.items-center")?.innerText;

    const topicsParentEl = document.querySelector(".overflow-hidden.transition-all");
    const topicsLink = topicsParentEl.querySelectorAll("a");
    const topics = Array.from(topicsLink).map((topic) => topic.innerText);

    return { title, difficulty, topics };
  }

  chrome.scripting
    .executeScript({
      target: { tabId },
      func: scrapeLeetCode,
    })
    .then(async (results) => {
      console.log("success script return");
      const { title, difficulty, topics } = results[0].result;
      console.log(title, difficulty, topics);
    });
});
