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

export { AddHtmlElement };
