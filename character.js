import { CharDetailsTab } from "./charDetailsTab.js";
import { ApiCall } from "./apiCall.js";
import { NewCharacter } from "./newCharacter.js";
import { ReturnBtn } from "./returnBtn.js";
function addCharToPage() {}

function getCharId() {
  const pageUrl = document.location.search;
  const urlParams = new URLSearchParams(pageUrl);
  const id = urlParams.get("id");
  return id;
}

async function setCharacterInfo() {
  const charContainer = document.querySelector(".char-container");
  const rtnBtnClass = new ReturnBtn(charContainer);
  const rtnBtn = rtnBtnClass.createButton();
  charContainer.appendChild(rtnBtn);
  rtnBtn.textContent = "RETURN";
  const charId = getCharId();
  const charCall = new ApiCall();
  const charData = await charCall.getApiData(
    `https://rickandmortyapi.com/api/character/${charId}`
  );
  const charInfo = new NewCharacter(charData);

  let newCharTab = new CharDetailsTab(charInfo.tileInfo, charInfo.detailedInfo);
  newCharTab.addCharDetails(charContainer);
}

setCharacterInfo();
