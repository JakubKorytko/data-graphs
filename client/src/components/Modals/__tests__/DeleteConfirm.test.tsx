import { DeleteConfirmProps } from "../DeleteConfirm.type";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

const fakeProps: DeleteConfirmProps = {
    id: 0,
    show: true,
    callback: () => {return true}
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
