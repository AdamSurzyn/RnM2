class NewCharacter {
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

export { NewCharacter };
