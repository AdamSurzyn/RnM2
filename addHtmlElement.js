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

  elementCreation(container, type, text, htmlClass, elementObj) {
    if (container !== undefined) {
      let htmlElement = document.createElement(type);

      for (const attribute in elementObj) {
        htmlElement.setAttribute(attribute, elementObj[attribute]);
      }

      if (htmlClass !== undefined) {
        htmlElement.classList.add(htmlClass);
      }
      if (text !== undefined) {
        htmlElement.innerHTML = text;
      }
      container.appendChild(htmlElement);
      return htmlElement;
    } else {
      return;
    }
  }

  addGenericElement({ container, type, text, htmlClass, ...elementObj }) {
    if (type === undefined) {
      return;
    }
    return this.elementCreation(container, type, text, htmlClass, elementObj);
  }
}

export { AddHtmlElement };
