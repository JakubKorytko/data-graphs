import { ApiData, State } from 'utils/api.util.type';

export interface DataContextType {
  data: ApiData | false,
  fetchData: Function,
  reconnect: Function
}

export interface NotificationsContextType {
  list: State[],
  notify: Function,
  remove: Function
}
