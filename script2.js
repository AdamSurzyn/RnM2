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
  constructor(htmlFile, container) {
    this.htmlFile = htmlFile;
    this.container = container;
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
        this.addImageElement(newElement, charTile.imageUrl, charTile.name);
      } else {
        this.addDivElement(newElement, value);
      }
    });

    this.onClickOpenTab(newElement, charTile, charDetails);
  }

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
  addLiElement(ulContainer, obj) {}
  onClickOpenTab(element, charTile, charDetails) {
    const joinedCharInfo = {
      ...charTile,
      ...charDetails,
    };

    element.addEventListener("click", () => {
      const newCharTab = new CharDetailsTab();
      newCharTab.openCharTab(joinedCharInfo);
    });
  }
}
class CharDetailsTab {
  constructor(charObj) {
    this.charObj = charObj;
  }
  async addCharDetails(container, charObj) {
    const charValues = Object.entries(charTile);
    newElement.classList.add("chars-card");
    container.appendChild(newElement);
    charValues.forEach(([key, value]) => {
      if (key === "imageUrl") {
        this.addImageElement(newElement, charTile.imageUrl, charTile.name);
      } else {
        this.addDivElement(newElement, value);
      }
    });
  }

  openCharTab(charObj) {
    const charPageStr = "./charPage.html";
    const charWindow = window.location.replace(charPageStr);
    console.log(charWindow);
    const charContainer = charWindow.document.querySelector(".char-container");
    const episodesUl = this.addUlElement(charContainer);
    console.log(charObj);
    charObj.episodes.forEach((episode) => {
      this.addEpisodes(episode, charContainer);
    });
  }

  async addEpisodes(url, container) {
    const episodeCall = new ApiCall(url);
    const episodes = await episodeCall.getApiData();
  }
  //Jak sensownie to zrobic, zeby miec klase, ktora moze korzystac z funkcjonalnosci innej klasy
}

async function hur() {
  if (window.location.host === "127.0.0.1:5500") {
    const rnmCall = new ApiCall("https://rickandmortyapi.com/api/character");
    rnmData = await rnmCall.getApiData();
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
    const mainPage = new MainPageContent("./index.html", charContainer);
    mainPage.listOfCharactersSetup(charsArr);
  }
}

hur();
/* TODO:
  1) add if statement to the initialisation that if the host is with new char, a new window should open and elements should be pushed to it..
*/
