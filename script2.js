class Character {
  //Content of a character and what details to add
  propertiesObj;
  constructor(propertiesObj) {
    this.properties = propertiesObj;
  }

  get Episodes() {
    let episodeObj = {
      id: "",
      name: "",
    };
    let episodesArr = this.properties.episode;
  }

  get tileInfo() {
    let tile = {
      imageUrl: this.properties.image,
      name: this.properties.name,
      species: this.properties.species,
    };

    return tile;
  }

  get detailedInfo() {
    let characterDetails = {
      id: this.properties.id,
      episodes: this.properties.episode,
      gender: this.properties.gender,
      locationName: this.properties.location.name,
      status: this.properties.status,
    };

    return characterDetails;
  }
}

class ApiCall {
  //Returning data from urls
  constructor() {}

  async getApiData(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson;
  }
}

class MainPageContent {
  //Loading up data to the page
  //Switching pages
  //Loading up a single character to the page
  container;
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
}

class CharDetailsTab {
  charTile;
  charDetails;
  constructor(charTile, charDetails) {
    this.charTile = charTile;
    this.charDetails = charDetails;
    this.addHtml = new AddHtmlElement();
  }
  async addCharDetails(container) {
    const charTile = Object.entries(this.charTile);
    const charDetails = Object.entries(this.charDetails);
    charTile.forEach(([key, value]) => {
      if (key === "imageUrl") {
        this.addHtml.addImageElement(
          container,
          this.charTile.imageUrl,
          this.charTile.name
        );
      } else {
        this.addHtml.addDivElement(container, value);
      }
    });
    charDetails.forEach(([key, value]) => {
      if (key === "episodes") {
        const episodesContainer = this.addHtml.addUlElement(container);
        value.forEach((episode) => {
          this.addHtml.addLiElement(episodesContainer, episode);
        });
        //This should be made into another method with api call instead of just link to the episode
      } else if (key !== "id") {
        this.addHtml.addDivElement(container, value);
      }
    });
  }
}

class AddHtmlElement {
  constructor() {}

  addDivElement(container, value) {
    let divElement = document.createElement("div");
    divElement.innerHTML = value;
    container.appendChild(divElement);
    return divElement;
  }
  addImageElement(container, imageSrc, name) {
    let imageElement = document.createElement("img");
    imageElement.setAttribute("src", imageSrc);
    imageElement.setAttribute("alt", name);
    container.appendChild(imageElement);
    return imageElement;
  }
  addUlElement(container) {
    let ulElement = document.createElement("ul");
    container.appendChild(ulElement);
    return ulElement;
  }
  addLiElement(ulContainer, value) {
    let liElement = document.createElement("li");
    liElement.innerHTML = value;
    ulContainer.appendChild(liElement);
    return liElement;
  }

  addElement(container, elementObj, type) {
    let htmlElement;
    switch (type) {
      case "div":
        htmlElement = document.createElement("div");
        for (const attribute in elementObj) {
          htmlElement.setAttribute(attribute, elementObj[attribute]);
          container.appendChild(htmlElement);
          return htmlElement;
        }
      case "img":
        htmlElement = document.createElement("img");
        for (const attribute in elementObj) {
          htmlElement.setAttribute(attribute, elementObj[attribute]);
          container.appendChild(htmlElement);
          return htmlElement;
        }
      case "ul":
        htmlElement = document.createElement("ul");
        for (const attribute in elementObj) {
          htmlElement.setAttribute(attribute, elementObj[attribute]);
          container.appendChild(htmlElement);
          return htmlElement;
        }
      case "li":
        htmlElement = document.createElement("li");
        for (const attribute in elementObj) {
          htmlElement.setAttribute(attribute, elementObj[attribute]);
          container.appendChild(htmlElement);
          return htmlElement;
        }
    }
  }
}

class PagingArrows {
  constructor() {
    this.newHtml = new AddHtmlElement();
    this.apiCall = new ApiCall();
  }

  addArrows(container, dataContainer, apiData) {
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
    arrowRight.addEventListener("click", (e) => {
      this.addDataOnclick(
        e,
        apiData.info.next,
        apiData.info.prev,
        dataContainer
      );
    });
    const arrowLeft = this.newHtml.addElement(container, arrowLeftObj, "div");
    arrowLeft.innerHTML = "<";
    arrowLeft.addEventListener("click", (e) => {
      this.addDataOnclick(
        e,
        apiData.info.next,
        apiData.info.prev,
        dataContainer
      );
    });
  }

  async addDataOnclick(e, nextPage, prevPage, dataContainer) {
    if ((e.target.class = "arrow-right")) {
      const nextData = await this.apiCall.getApiData(nextPage);
      console.log(nextData);
      this.loadNewDataOnPage(dataContainer, nextData);
    } else {
      const prevData = await this.apiCall.getApiData(prevPage);
      console.log(prevData);
      this.loadNewDataOnPage(dataContainer, prevData);
    }
  }

  loadNewDataOnPage(container, pageData) {
    this.clearContainer(container);
    let charsArr = [];
    pageData.results.forEach((char) => {
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

  clearContainer(container) {
    container.replaceChildren();
  }
}

export {
  ApiCall,
  MainPageContent,
  Character,
  CharDetailsTab,
  AddHtmlElement,
  PagingArrows,
};
