import { ApiCall, MainPageContent, Character } from "./script2.js";

async function hur() {
  const rnmCall = new ApiCall("https://rickandmortyapi.com/api/character");
  const rnmData = await rnmCall.getApiData();
  let charsArr = [];
  rnmData.results.forEach((char) => {
    let charToPush = new Character(char);
    let charObj = {
      tile: charToPush.tileInfo,
      details: charToPush.detailedInfo,
    };
    charsArr.push(charObj);
  });
  const charContainer = document.querySelector(".list-of-chars");
  const mainPage = new MainPageContent(charContainer);
  mainPage.listOfCharactersSetup(charsArr);
}

hur();
