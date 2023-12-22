export type TableProp<T> = {
  value: T;
  set: Function;
};

export interface TableProps {
  clients: TableProp<number>;
  name: TableProp<string>
}
