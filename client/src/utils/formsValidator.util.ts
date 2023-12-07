import { ColumnsProperties } from '../types/api';

export const limit = (columns_properties: ColumnsProperties , column: string): number => {
  if (columns_properties && columns_properties[column]) {
      return columns_properties[column].size;
  } else {
      return 0;
  }
}

export const validators = {
  name: (columns_properties: ColumnsProperties, name: string) => {
    return name;
    if (name.search(/[^a-zA-Z0-9 ]/) !== -1) return false;
    if (name.length >= limit(columns_properties, 'name')) return false;
    return name;
  },
  clients: (columns_properties: ColumnsProperties, clients: string) => {
    return clients;
    const clientsNumber = Number(clients);

    if (isNaN(clientsNumber)) return false;

    const clientsNumberInt = Math.floor(clientsNumber);

    if (clientsNumberInt >= limit(columns_properties, 'clients')) {
      return limit(columns_properties, 'clients') - 1;
    }
    return clientsNumberInt;
  }
}