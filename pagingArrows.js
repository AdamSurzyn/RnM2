import { AddHtmlElement } from "./addHtmlElement.js";
import { ApiCall } from "./apiCall.js";
import { NewCharacter } from "./newCharacter.js";
import { MainPageContent } from "./mainPageContent.js";

class PagingArrows {
  constructor() {
    this.newHtml = new AddHtmlElement();
    this.apiCall = new ApiCall();
  }

  addArrows(container, dataContainer, apiData) {
    let nextPageUrl = apiData.info.next;
    let prevPageUrl = apiData.info.prev;
    const arrowRightObj = {
      container: container,
      type: "div",
      htmlClass: "arrow-right",
      text: ">",
    };
    const arrowLeftObj = {
      container: container,
      type: "div",
      htmlClass: "arrow-left",
      text: "<",
    };

    const arrowLeft = this.newHtml.addElement(arrowLeftObj);
    arrowLeft.addEventListener("click", async (e) => {
      const newData = await this.arrowsFunction(
        e,
        nextPageUrl,
        prevPageUrl,
        apiData,
        dataContainer
      );
      nextPageUrl = newData.info.next;
      prevPageUrl = newData.info.prev;
    });
    const arrowRight = this.newHtml.addElement(arrowRightObj);
    arrowRight.addEventListener("click", async (e) => {
      const newData = await this.arrowsFunction(
        e,
        nextPageUrl,
        prevPageUrl,
        apiData,
        dataContainer
      );
      nextPageUrl = newData.info.next;
      prevPageUrl = newData.info.prev;
    });
  }

  async arrowsFunction(
    element,
    nextPageUrl,
    prevPageUrl,
    apiData,
    dataContainer
  ) {
    const newData = await this.addDataOnclick(
      element,
      nextPageUrl,
      prevPageUrl,
      apiData
    );
    this.loadNewDataOnPage(dataContainer, newData);
    return newData;
  }

  async addDataOnclick(e, nextPage, prevPage, currentData) {
    if (e.target.className === "arrow-right") {
      const nextData = await this.apiCall.getApiData(nextPage);
      return nextData;
    } else {
      if (prevPage != null) {
        const prevData = await this.apiCall.getApiData(prevPage);
        return prevData;
      } else {
        return currentData;
      }
    }
  }

  loadNewDataOnPage(container, pageData) {
    const charContainer = document.querySelector(".list-of-chars");
    const mainPage = new MainPageContent(charContainer);
    mainPage.clearContainer(container);
    let charsArr = [];
    pageData.results.forEach((char) => {
      let charToPush = new NewCharacter(char);
      let charObj = {
        tile: charToPush.tileInfo,
        details: charToPush.detailedInfo,
      };
      charsArr.push(charObj);
    });
    mainPage.listOfCharactersSetup(charsArr);
  }
}

export { PagingArrows };
