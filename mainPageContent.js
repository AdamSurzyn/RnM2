import { AddHtmlElement } from "./addHtmlElement.js";

class MainPageContent {
  //Loading up data to the page
  //Switching pages
  //Loading up a single character to the page
  constructor(container) {
    this.container = container;
    this.createHtml = new AddHtmlElement();
  }

  listOfCharactersSetup(charsObj) {
    charsObj.forEach((char) => {
      this.addCharacterToContainer(this.container, char.tile, char.details);
    });
  }

  addCharacterToContainer(container, charTile, charDetails) {
    const charListContainerObj = {
      container: container,
      type: "div",
      text: "",
      htmlClass: "char-container",
    };
    const charListContainer = this.createHtml.addElement(charListContainerObj);
    const charValues = Object.entries(charTile);
    console.log(charValues);
    charValues.forEach(([key, value]) => {
      if (key === "imageUrl") {
        let charObjImg = {
          src: charTile.imageUrl,
          container: charListContainer,
          type: "img",
          text: "",
          htmlClass: "char-img",
        };
        this.createHtml.addElement(charObjImg);
      } else {
        let charObjDiv = {
          container: charListContainer,
          type: "div",
          text: value,
          htmlClass: "char-text",
        };
        this.createHtml.addElement(charObjDiv);
      }
    });
    this.onClickOpenTab(charListContainer, charTile, charDetails);
  }

  onClickOpenTab(element, charTile, charDetails) {
    const joinedCharInfo = {
      ...charTile,
      ...charDetails, //This is worthless - im going to make a separate api call anyway
    };
    console.log(joinedCharInfo);
    element.addEventListener("click", () => {
      this.openCharTab(joinedCharInfo);
    });
  }
  openCharTab(charObj) {
    const charId = charObj.id;
    document.location.href = `http://127.0.0.1:5500/charPage.html?id=${charId}`;
  }

  clearContainer(container) {
    container.replaceChildren();
  }
}

export { MainPageContent };
