import { ApiCall } from "./apiCall.js";
import { MainPageContent } from "./mainPageContent.js";
import { NewCharacter } from "./newCharacter.js";
import { PagingArrows } from "./pagingArrows.js";
import { AddHtmlElement } from "./addHtmlElement.js";
import { Search } from "./search.js";

async function loadMainPage() {
  const rnmCall = new ApiCall();
  const rnmData = await rnmCall.getApiData(
    "https://rickandmortyapi.com/api/character/?page=1"
  );
  let charsArr = [];
  rnmData.results.forEach((char) => {
    let charToPush = new NewCharacter(char);
    let charObj = {
      tile: charToPush.tileInfo,
      details: charToPush.detailedInfo,
    };
    charsArr.push(charObj);
  });
  const charContainer = document.querySelector(".list-of-chars");
  const mainPage = new MainPageContent(charContainer);
  mainPage.clearContainer(charContainer);
  mainPage.listOfCharactersSetup(charsArr);
  const arrowsContainer = document.createElement("div");
  arrowsContainer.classList.add("arrows-container");
  document.body.appendChild(arrowsContainer);
  const arrows = new PagingArrows();
  arrows.addArrows(arrowsContainer, charContainer, rnmData);
  const searcher = new Search(
    "https://rickandmortyapi.com/api/character",
    charContainer
  );
  searcher.createSearchForm();
}

loadMainPage();
