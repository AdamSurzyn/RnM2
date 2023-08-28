import { jest } from "@jest/globals";
import { AddHtmlElement } from "../addHtmlElement.js";

jest.unstable_mockModule("fs", async function () {
  return import("./__mocks__/fs.js");
});

const htmlMock = jest.fn();
const eventListenerMock = jest.fn();

describe("Return button", function () {
  it("", async function () {
    const { ReturnBtn } = await import("../returnBtn.js");
    const container = document.createElement("div");
    const rtnButton = new ReturnBtn(container);
    htmlMock.mockReturnValue("button");
    rtnButton.addClickListener = eventListenerMock;
    rtnButton.createElement.addGenericElement = htmlMock;
    expect(rtnButton.createButton()).toBe("button");
  });
});

// Z tego co czytam to tez bym mogl uzyc jest.mock('./addHtmlElement.js) jako automatyyczny mock i sprawdzac, czy zostal callowany etc. Ale nie wiem jak przypisac wtedy np konkretnej metodzie zwrot konkretnej wartosci
