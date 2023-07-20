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
      class: "chars-card",
    };
    const charListContainer = this.createHtml.addElement(
      container,
      charListContainerObj,
      "div"
    );

    const charValues = Object.entries(charTile);
    charValues.forEach(([key, value]) => {
      if (key === "imageUrl") {
        this.createHtml.addImageElement(
          charListContainer,
          charTile.imageUrl,
          charTile.name
        );
      } else {
        this.createHtml.addDivElement(charListContainer, value);
      }
    });
    this.onClickOpenTab(charListContainer, charTile, charDetails);
  }

  onClickOpenTab(element, charTile, charDetails) {
    const joinedCharInfo = {
      ...charTile,
      ...charDetails, //This is worthless - im going to make a separate api call anyway
    };
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
