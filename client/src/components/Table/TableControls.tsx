//[1]: pusty łańcuch tekstowy dodany aby naprawić liczby zaczynające się na 0 (np. 01, 02, 03)
//powiązane z: https://github.com/facebook/react/issues/9402
//usunąć łańcuch po naprawie błędu

import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { AddChannelFormProps } from '../../types/props';
import Form from 'react-bootstrap/Form';
import { limit } from '../../utils/table.util';
import { DataContext } from '../Wrappers/Context';

function AddChannelForm(props: AddChannelFormProps) {
  
  const {data} = useContext(DataContext);
  
  const {columns_properties} = props;

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>, ) => {
    const value = e.target.value;
    if (value.length >= limit(columns_properties, 'name')) return;
    props.name.set(value)
  };

  const clientsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clientsNumber = Number(e.target.value);
    console.log(clientsNumber)
    if (clientsNumber >= limit(columns_properties, 'clients')) {
      props.clients.set(limit(columns_properties, 'clients')-1);
      return;
    }
    props.clients.set(clientsNumber);
  };

  const centerContent = {
    textAlign: "center" as "center",
    verticalAlign: "middle"
  }

  const placeHolders = {
    name: `Nazwa kanału (maks. długość: ${limit(columns_properties, 'name')})`,
    clients: `Ilość klientów (maks. liczba: ${limit(columns_properties, 'clients')})`
  }

  return (
      <tr>
      <td style={centerContent}>5</td>
      <td style={centerContent} colSpan={2}>
        <Form.Group>
          <Form.Control disabled={!props.enabled} type="text" required value={props.name.value} onChange={nameHandler} placeholder={placeHolders.name} />
        </Form.Group>
        </td><td style={centerContent} colSpan={2}>
        <Form.Group>
          <Form.Control disabled={!props.enabled}type="number" required value={props.clients.value + '' /* [1] */} onChange={clientsHandler} placeholder={placeHolders.clients} />
        </Form.Group>
        </td><td style={centerContent}>
        <Button variant="light" disabled={!props.enabled} type="submit">
          Dodaj
        </Button>
        </td>
        </tr>
  );
}

export default AddChannelForm;