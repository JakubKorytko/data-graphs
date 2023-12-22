import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import style from 'components/Table/Table.style';
import { EditRowProps } from 'components/Table/EditRow.type';

import { DataContext } from 'components/Wrappers/Context';

import { validators } from 'utils/formsValidator.util';

function EditRow(props: EditRowProps) {
  const {
    id, name: nameFromProps, clients: clientsFromProps, setEditMode, editModeCallback,
  } = props;

  const [name, setName] = useState(nameFromProps);
  const [clients, setClients] = useState(clientsFromProps);
  const { data } = useContext(DataContext);

  const enabled = data !== false;
  if (!enabled) return null;

  const buttons = [
    {
      variant: 'light', text: 'Cancel', colspan: 1, onClick: () => { setEditMode(false); },
    },
    {
      variant: 'light', text: 'Save', colspan: 1, onClick: () => { editModeCallback(name, clients); },
    },
  ];

  const buttonsList = buttons.map((button, index) => {
    const tdKey = `${button.text}-${index}`;
    const buttonKey = `${button.text}-${index}`;

    return (
      <td
        key={tdKey}
        colSpan={button.colspan}
        style={style.button}
      >
        <Button
          key={buttonKey}
          onKeyDown={button.onClick}
          onClick={button.onClick}
          variant={button.variant}
        >
          {button.text}
        </Button>
      </td>
    );
  });

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = validators.name(data.columns_properties, e.target.value);
    if (val === false) return;
    setName(val);
  };

  const clientsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = validators.clients(data.columns_properties, e.target.value);
    if (val === false) return;
    setClients(val);
  };

  return (
    <tr className="blink">
      <td style={style.center}>{id}</td>
      <td style={style.center} colSpan={2}><Form.Control disabled={!enabled} type="text" required value={name} onChange={nameHandler} /></td>
      <td style={style.center}><Form.Control disabled={!enabled} type="text" required value={clients} onChange={clientsHandler} /></td>
      {buttonsList}
    </tr>
  );
}

export default EditRow;
