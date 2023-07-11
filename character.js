import { ApiCall, CharDetailsTab, Character } from "./script2.js";
function addCharToPage() {}

function getCharId() {
  const pageUrl = document.location.search;
  const urlParams = new URLSearchParams(pageUrl);
  const id = urlParams.get("id");
  return id;
}

async function setCharacterInfo() {
  const charId = getCharId();
  const charCall = new ApiCall(
    `https://rickandmortyapi.com/api/character/${charId}`
  );
  const charData = await charCall.getApiData();
  const charInfo = new Character(charData);
  const charContainer = document.querySelector(".char-container");
  let newCharTab = new CharDetailsTab(charInfo.tileInfo, charInfo.detailedInfo);
  newCharTab.addCharDetails(charContainer);
}

setCharacterInfo();
