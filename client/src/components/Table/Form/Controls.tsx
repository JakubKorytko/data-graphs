//[1]: pusty łańcuch tekstowy dodany aby naprawić liczby zaczynające się na 0 (np. 01, 02, 03)
//powiązane z: https://github.com/facebook/react/issues/9402
//usunąć łańcuch po naprawie błędu

import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { TableControlsProps } from './Controls.type';
import { limit, validators } from '../../../utils/formsValidator.util';
import { DataContext } from '../../Wrappers/Context';
import style from '../Table.style';
import FormGroup from './Group';

function TableControls(props: TableControlsProps) {

  const { data } = useContext(DataContext);

  const length = data ? data.channels.data.length : 0
  const lastId = (data && data.channels.data.length>0) ? data.channels.data[length - 1].id : 0;

  const enabled = data !== false;
  const columns_properties = data ? data.columns_properties : {};

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>,) => {
    const val = validators.name(columns_properties, e.target.value);
    if (val === false) return;
    props.name.set(val);
  };

  const clientsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = validators.clients(columns_properties, e.target.value);
    if (val === false) return;
    props.clients.set(val);
  };

  const groups = [
    {
      id: 0,
      name: 'name',
      value: props.name.value,
      handler: nameHandler,
      placeholder: `Nazwa kanału (maks. długość: ${limit(columns_properties, 'name')})`
    },
    {
      id: 1,
      name: 'clients',
      value: props.clients.value + '' /* [1] */,
      handler: clientsHandler,
      placeholder: `Ilość klientów (maks. liczba: ${limit(columns_properties, 'clients')})`
    }
  ]

  const FormGroups = groups.map(group => <FormGroup {...group} key={group.id} enabled={enabled} />);

  return (
    <tr>
      <td style={style.center}>{lastId+1}</td>
      {FormGroups}
      <td style={style.center}>
        <Button variant="light" disabled={!enabled} type="submit">Dodaj</Button>
      </td>
    </tr>
  );
}

export default TableControls;
