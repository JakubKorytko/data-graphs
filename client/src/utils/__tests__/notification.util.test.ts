import generate from 'utils/notification.util';

test('notification should be proper object', () => {
  const notification = generate(1000, 'test');
  expect(notification.title).toBe('Wrong name');

  const secondNotification = generate(400, 'test');
  expect(secondNotification.body).toBe('test');
});

export {}; // this file needs to be a module
