import { AddHtmlElement } from "./addHtmlElement.js";

class ReturnBtn {
  constructor(container) {
    this.container = container;
    this.createElement = new AddHtmlElement();
  }

  createButton() {
    const btnObj = {
      container: this.container,
      type: "button",
      htmlClass: "return-button",
      text: "Take me back",
    };
    const returnButton = this.createElement.addGenericElement(btnObj);
    this.addClickListener(returnButton, this.returnToMain);
    return returnButton;
  }

  returnToMain() {
    document.location.href = `http://127.0.0.1:5500`;
  }

  addClickListener(element, func) {
    element.addEventListener("click", () => {
      func();
    });
  }
}

export { ReturnBtn };
