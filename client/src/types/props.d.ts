import { ApiData, ColumnsProperties } from "../utils/api.util"

export interface NotificationsProps {
}

export interface DeleteConfirmProps {
    callback: Function,
    show: boolean,
    id: number
}

export interface TableControlsProps {
    clients: {value: number, set: Function},
    name: {value: string, set: Function}
}

export interface NotificationTitleProps {
    children: React.ReactNode
}

export interface NotificationBodyProps {
    children: React.ReactNode
}

export interface NotificationProps {
    children: React.ReactNode,
    remove: Function
}

export interface TableContainerProps {
}

export type TableProps = any

export interface DataWrapperProps {
    children: React.ReactNode,
    connection: boolean,
}

export interface NotificationWrapperProps {
    children: React.ReactNode
}

export interface DataContextProps {
    data: ApiData | false
}