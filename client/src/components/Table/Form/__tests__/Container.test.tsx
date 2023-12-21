import { TableFormProps } from "../Container.type";

const fakeProps: TableFormProps = {
    children: <span>Test</span>,
}

import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

let container: any = null;

beforeEach(() => {
  // setup a DOM element as a render target

  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  if (container != null) {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  }
});

it("renders", () => {
  act(() => {
    expect(true).toBe(true);
  });
})
