import errorHandler from 'utils/table.util';

test('error handler should return false if no errors', () => {
  const data = {
    name: { value: 'test', limit: 10 },
    clients: { value: 5, limit: 10 },
  };
  const errors = errorHandler(data);
  expect(errors).toBe(false);
});

test('error handler should return object with errors', () => {
  const data = {
    name: { value: 'test', limit: 2 },
    clients: { value: 15, limit: 10 },
  };
  const errors = errorHandler(data);
  expect(errors).toHaveProperty('name');
  expect(errors).toHaveProperty('clients');
});

export {}; // this file needs to be a module
