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
      class: "arrow-right",
      innerHTML: ">",
    };
    const arrowLeftObj = {
      class: "arrow-left",
      innerHTML: "<",
    };
    const arrowRight = this.newHtml.addElement(container, arrowRightObj, "div");
    arrowRight.innerHTML = ">";
    arrowRight.addEventListener("click", async (e) => {
      const newData = await this.addDataOnclick(
        e,
        nextPageUrl,
        prevPageUrl,
        apiData
      );
      console.log(newData);
      this.loadNewDataOnPage(dataContainer, newData);

      nextPageUrl = newData.info.next;
      prevPageUrl = newData.info.prev;
    });

    const arrowLeft = this.newHtml.addElement(container, arrowLeftObj, "div");
    arrowLeft.innerHTML = "<";
    arrowLeft.addEventListener("click", async (e) => {
      const newData = await this.addDataOnclick(
        e,
        nextPageUrl,
        prevPageUrl,
        apiData
      );
      console.log(newData);
      this.loadNewDataOnPage(dataContainer, newData);

      nextPageUrl = newData.info.next;
      prevPageUrl = newData.info.prev;
    });
  }

  async addDataOnclick(e, nextPage, prevPage, currentData) {
    console.log(e);
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
