import { jest } from "@jest/globals";
import { AddHtmlElement } from "./addHtmlElement.js";

jest.unstable_mockModule("fs", async function () {
  return import("./__mocks__/fs.js");
});
const htmlMock = jest.fn();
const eventListenerMock = jest.fn();
describe("Return button", function () {
  it("", async function () {
    const { ReturnBtn } = await import("./returnBtn.js");
    const container = document.createElement("div");
    const rtnButton = new ReturnBtn(container);
    htmlMock.mockReturnValue("button");
    rtnButton.addClickListener = eventListenerMock;
    rtnButton.createElement.addElement = htmlMock;
    expect(rtnButton.createButton()).toBe("button");
  });
});
