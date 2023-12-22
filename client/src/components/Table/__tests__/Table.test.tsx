import { act } from 'react-dom/test-utils';

// import { TableProps } from '../Table.type';

// const fakeProps: TableProps = {
//   clients: {
//     value: 0,
//     set: () => true,
//   },
//   name: {
//     value: '',
//     set: () => true,
//   },
// };

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
