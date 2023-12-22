import { NotificationInterface } from 'utils/notification.util.type';

// important: these are not http response codes, but custom notification error codes

const codes: { [key: number]: string } = {
  0: 'Unable to connect to the server. Next attempt in 5 seconds.',
  1: 'Fetching data from the server...',
  2: 'Trying to connect to the server...',
  3: 'Successfully connected to the server.',

  200: 'Data fetched from the server.',
  409: 'A channel with the given name already exists.',
  500: 'Unable to retrieve data from the server. Next attempt in 10 seconds.',
};

const generate = (code: number, message: string) => {
  const notification: NotificationInterface = {
    code: code ?? 0,
    title: `${message}`,
    body: 'Unexpected error. Contact the administrator.',
  };

  if (codes[code]) notification.body = codes[code];

  else if (code === 1000 || code === 1001) {
    notification.body = message;
    if (code === 1000) notification.title = 'Wrong name';
    else notification.title = 'Wrong number of clients';
  } else if (code >= 400 && code < 500) {
    notification.body = message;
    notification.title = 'Client error';
  }

  return notification;
};

export default generate;
