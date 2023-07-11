class Character {
  //Content of a character and what details to add
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
  constructor(url) {
    this.url = url;
  }

  async getApiData() {
    const response = await fetch(this.url);
    const responseJson = await response.json();
    return responseJson;
  }
}

class MainPageContent {
  //Loading up data to the page
  //Switching pages
  //Loading up a single character to the page
  constructor(container) {
    this.container = container;
    this.createHtml = new addHtmlElement();
  }

  listOfCharactersSetup(charsObj) {
    charsObj.forEach((char) => {
      this.addCharacterToContainer(this.container, char.tile, char.details);
    });
  }

  addCharacterToContainer(container, charTile, charDetails) {
    let newElement = document.createElement("div");
    const charValues = Object.entries(charTile);
    newElement.classList.add("chars-card");
    container.appendChild(newElement);
    charValues.forEach(([key, value]) => {
      if (key === "imageUrl") {
        this.createHtml.addImageElement(
          newElement,
          charTile.imageUrl,
          charTile.name
        );
      } else {
        this.createHtml.addDivElement(newElement, value);
      }
    });
    this.onClickOpenTab(newElement, charTile, charDetails);
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
  constructor(charTile, charDetails) {
    (this.charTile = charTile),
      (this.charDetails = charDetails),
      (this.addHtml = new addHtmlElement());
  }
  async addCharDetails(container) {
    const charTile = Object.entries(this.charTile);
    const charDetails = Object.entries(this.charDetails);
    console.log(this.charDetails);
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

class addHtmlElement {
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
}

export { ApiCall, MainPageContent, Character, CharDetailsTab, addHtmlElement };
