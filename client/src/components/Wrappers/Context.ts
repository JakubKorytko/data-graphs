import React from 'react';

import { DataContextType, NotificationsContextType } from './Context.type';

export const DataContext = React.createContext<DataContextType>(
  {
    data: false,
    fetchData: () => false,
    reconnect: () => false,
  },
);

export const NotificationsContext = React.createContext<NotificationsContextType>(
  {
    list: [],
    notify: () => false,
    remove: () => false,
  },
);
