export type TableProp = {
    value: number;
    set: Function;
}

export interface TableProps {
    clients: TableProp,
    name: TableProp
}
