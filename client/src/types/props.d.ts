export interface ChartProps {
    data: any[] | false,
    colors: string[] | false
}

export interface NotificationsProps {
    list: any[],
    remove: Function
}

export interface AddChannelFormProps {
    reconnect: Function,
    notify: Function,
    fetchData: Function,
    enabled: boolean,
    columns_properties: ColumnsProperties | false
}