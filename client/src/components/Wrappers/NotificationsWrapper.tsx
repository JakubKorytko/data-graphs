import React, { useEffect, useMemo, useReducer } from 'react';

import Notifications from 'components/Notifications/Container';

import { NotificationWrapperProps } from 'components/Wrappers/NotificationsWrapper.type';
import { NotificationsContext } from 'components/Wrappers/Context';

import { State } from 'utils/api.util.type';

const reducer = (notifications: State[], action: { type: string, object: State }): State[] => {
  const exists = notifications.some(
    (notification: State) => notification.code === action.object.code,
  );
  const filtered = notifications.filter(
    (notification: State) => notification.code !== action.object.code,
  );

  switch (action.type) {
    case 'add':
      if (exists) return notifications;
      return [...notifications, action.object];
    case 'remove':
      return filtered;
    case 'clear':
      return [];
    default:
      return notifications;
  }
};

function NotificationsWrapper(props: NotificationWrapperProps) {
  const [notifications, dispatch] = useReducer(reducer, []);

  const { children } = props;

  const removeTimeouts: number[] = [];

  const notify = (object: { code: number, message: string }, seconds: number) => {
    if (object.code === 500 || object.code === 200) dispatch({ type: 'remove', object: { code: 1, message: 'Fetching data from the server...' } });
    if (object.code === 200) dispatch({ type: 'remove', object: { code: 500, message: 'Internal server error' } });

    dispatch({ type: 'add', object });

    if (removeTimeouts[object.code]) {
      clearTimeout(removeTimeouts[object.code]);
    }
    removeTimeouts[object.code] = window.setTimeout(() => { dispatch({ type: 'remove', object }); }, seconds * 1000);
  };

  useEffect(() => () => {
    dispatch({ type: 'clear', object: { code: 0, message: 'clear' } });
    [1, 200, 500, 409, 1000, 1001].forEach((timeout) => {
      clearTimeout(removeTimeouts[timeout]);
    });
  }, []);

  const contextProxy = useMemo(() => ({
    notify,
    list: notifications,
    remove: (code: number) => { dispatch({ type: 'remove', object: { code, message: 'remove' } }); },
  }), [notifications]);

  return (
    <NotificationsContext.Provider value={contextProxy}>
      {children}
      <Notifications />
    </NotificationsContext.Provider>
  );
}

export default NotificationsWrapper;
