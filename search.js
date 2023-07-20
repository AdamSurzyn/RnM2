import { AddHtmlElement } from "./addHtmlElement.js";
import { MainPageContent } from "./mainPageContent.js";
import { ApiCall } from "./apiCall.js";
import { NewCharacter } from "./newCharacter.js";
class Search {
  #url;
  #container;
  constructor(url, container) {
    this.url = url;
    this.newHtml = new AddHtmlElement();
    this.ApiCall = new ApiCall();
    this.NewCharacter = new NewCharacter();
    this.outputContainer = container;
  }

  createSearchForm(container, name, placeholder) {
    // const inputObj = {
    //     name:name,
    //     placeholder:placeholder,
    //     type: "text",
    //     class: "char-search-input"
    // }
    // const input = this.newHtml.addElement(container, inputObj)
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", "charName");
    input.setAttribute("placeholder", "Character name");
    document.body.appendChild(input);
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        let name = e.srcElement.value;
        this.searchFuntion(name, this.url);
      }
    });
  }

  async searchFuntion(name, searchUrl) {
    const apiSearchUrl = this.replaceWithName(name, searchUrl);
    const searchData = await this.ApiCall.getApiData(apiSearchUrl);
    this.addSearchedCharsToMain(searchData);
  }

  replaceWithName(name, url) {
    return url + `/?name=${name}`;
  }

  addSearchedCharsToMain(searchOutput) {
    const mainPage = new MainPageContent(this.outputContainer);
    const charsArr = this.iterateThroughChars(searchOutput);
    mainPage.clearContainer(this.outputContainer);
    mainPage.listOfCharactersSetup(charsArr);
  }

  iterateThroughChars(apiResult) {
    let charsArr = [];
    apiResult.results.forEach((char) => {
      let charToPush = new NewCharacter(char);
      let charObj = {
        tile: charToPush.tileInfo,
        details: charToPush.detailedInfo,
      };
      charsArr.push(charObj);
    });
    return charsArr;
  }
}

export { Search };
