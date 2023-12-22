import { act } from 'react-dom/test-utils';

let container: any = null;

beforeEach(() => {
  // setup a DOM element as a render target

  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  if (container != null) {
    container.remove();
    container = null;
  }
});

it('renders', () => {
  act(() => {
    expect(true).toBe(true);
  });
});
