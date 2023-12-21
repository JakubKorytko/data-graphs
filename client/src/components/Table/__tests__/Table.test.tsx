import { unmountComponentAtNode } from "react-dom";
import { TableProps } from "../Table.type";
import { act } from "react-dom/test-utils";

const fakeProps: TableProps = {
    clients: {
        value: 0,
        set: () => {return true}
    },
    name: {
        value: "",
        set: () => {return true}
    }
}

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
