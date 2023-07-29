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
/**
 * TODO: Add innerHTML to the addHtmlELement creation
 * TODO: Create all HTML elements with addHtmlElement class
 * TODO: Add episodes and their names to the individual character tab
 * TODO: Whole css...
 * TODO: Assigning folders for specific .js files
 * TODO: Combine the character obj into one and then create different character html element depending if it's in tile or seperate tab
 * TODO: Create helper functions (iterating through object etc.)
 */

loadMainPage();
