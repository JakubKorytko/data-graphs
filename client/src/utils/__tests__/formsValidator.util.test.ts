import { validators } from 'utils/formsValidator.util';

test('proper name and clients number should return values back', () => {
  const columnsProperties = {
    name: { type: 'string', size: 10 },
    clients: { type: 'integer', size: 10 },
  };

  const name = validators.name(columnsProperties, 'test');
  const clients = validators.clients(columnsProperties, '5');

  expect(name).toBe('test');
  expect(clients).toBe(5);
});

export {}; // this file needs to be a module
