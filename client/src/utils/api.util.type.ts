export interface ApiData {
    type: string;
    columns: string[];
    columns_properties: ColumnsProperties;
    channels: Channels;
    chartColors: string[];
}

export interface State { 
    code: number, 
    message: string 
}

export interface Channels {
    current_page: number;
    data: Channel[];
    first_page_url: string;
    from: null;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: null;
    path: string;
    per_page: number;
    prev_page_url: null;
    to: null;
    total: number;
}

export interface Channel {
    id: number;
    name: string;
    clients: number;
}

export interface Link {
    url: null | string;
    label: string;
    active: boolean;
}

export interface ColumnsProperties {
    [key: string]: Property;
}

export interface Property {
    type: string;
    size: number;
}

export interface CustomMessage {
    type: string,
    code: number,
    message: string
}

export interface CustomResponse {
    type: string,
    response: Response
}