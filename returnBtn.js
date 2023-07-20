import { AddHtmlElement } from "./addHtmlElement.js";

class ReturnBtn {
  constructor(container) {
    this.container = container;
    this.createElement = new AddHtmlElement();
  }

  createButton() {
    const btnObj = {
      type: "button",
      name: "return-button",
      textContent: "Take me back",
    };
    const returnButton = this.createElement.addElement(
      this.container,
      btnObj,
      "button"
    );
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
