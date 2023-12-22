// [1]: empty string added to fix numbers starting with 0 (e.g. 01, 02, 03)
// related to: https://github.com/facebook/react/issues/9402
// remove string after bug fix

import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';

import style from 'components/Table/Table.style';
import { TableControlsProps } from 'components/Table/Form/Controls.type';
import FormGroup from 'components/Table/Form/Group';

import { DataContext } from 'components/Wrappers/Context';

import { limit, validators } from 'utils/formsValidator.util';

function TableControls(props: TableControlsProps) {
  const { data } = useContext(DataContext);

  const length = data ? data.channels.data.length : 0;
  const lastId = (data && data.channels.data.length > 0) ? data.channels.data[length - 1].id : 0;

  const enabled = data !== false;
  const columnsProperties = data ? data.columns_properties : {};

  const { clients, name } = props;

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = validators.name(columnsProperties, e.target.value);
    if (val === false) return;
    name.set(val);
  };

  const clientsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = validators.clients(columnsProperties, e.target.value);
    if (val === false) return;
    clients.set(val);
  };

  const groups = [
    {
      id: 0,
      name: 'name',
      value: name.value,
      handler: nameHandler,
      placeholder: `Channel name (max length: ${limit(columnsProperties, 'name')})`,
    },
    {
      id: 1,
      name: 'clients',
      value: `${clients.value}` /* [1] */,
      handler: clientsHandler,
      placeholder: `Clients number (max value: ${limit(columnsProperties, 'clients')})`,
    },
  ];

  const FormGroups = groups.map((group) => (
    <FormGroup
      key={group.id}
      name={group.name}
      value={group.value}
      handler={group.handler}
      placeholder={group.placeholder}
      enabled={enabled}
    />
  ));

  return (
    <tr>
      <td style={style.center}>{lastId + 1}</td>
      {FormGroups}
      <td style={style.center}>
        <Button variant="light" disabled={!enabled} type="submit">Add</Button>
      </td>
    </tr>
  );
}

export default TableControls;
