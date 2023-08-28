import { jest } from "@jest/globals";
import { AddHtmlElement } from "../addHtmlElement.js";

jest.unstable_mockModule("fs", async function () {
  return import("./__mocks__/fs.js");
});
const htmlClass = new AddHtmlElement();
const container = document.createElement("div");
describe("Testing HTML creation class: ", () => {
  it("doesn't try to create element when type is undefined", () => {
    const typelessObj = {
      text: "typeless",
      htmlClass: "typeless-class",
      container: container,
    };

    const genericElement = htmlClass.addGenericElement(typelessObj);
    expect(genericElement).toBe(undefined);
  });
  it("Doesn't try to create element when container is undefined", () => {
    const containerlessObj = {
      text: "typeless",
      htmlClass: "typeless-class",
      type: "div",
    };
    const genericElement = htmlClass.addGenericElement(containerlessObj);
    expect(genericElement).toBe(undefined);
  });
  it("Creates an element even if type is of diferent type than string", () => {
    const typedifObj = {
      text: "typeless",
      htmlClass: "typeless-class",
      type: ["div"],
      container: container,
    };
    const genericElement = htmlClass.addGenericElement(typedifObj);
    console.log(genericElement);
    expect(genericElement).toBeTruthy;
  });
});
