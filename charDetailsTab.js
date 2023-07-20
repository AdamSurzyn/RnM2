import { AddHtmlElement } from "./addHtmlElement.js";
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

export { CharDetailsTab };
