import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';

import DeleteConfirm from 'components/Modals/DeleteConfirm';

import EditRow from 'components/Table/EditRow';
import style from 'components/Table/Table.style';

import { DataContext } from 'components/Wrappers/Context';

import { remove, update } from 'utils/api.util';
import {
  ApiData, Channel, CustomMessage, CustomResponse,
} from 'utils/api.util.type';

function TableRow(props: { data: ApiData | false, rowIndex: number }) {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const { fetchData, reconnect } = useContext(DataContext);

  const { data, rowIndex } = props;
  if (!data) return null;

  const { id } = data.channels.data[rowIndex];

  const callbackSteps = (res: CustomResponse | CustomMessage) => new Promise((resolve) => {
    if (res.type === 'failure') {
      const { status } = (res as CustomResponse).response;

      const { response } = res as CustomResponse;
      const info = { code: status, message: response.statusText };
      if (status === 500) reconnect(info);
      resolve('failure');
    } else {
      const err = (res as CustomMessage);
      reconnect({ code: err.code, message: err.message });
      resolve('error');
    }
  });

  const deleteCallback = (del: boolean) => {
    setShowModal(false);
    if (!del) return new Promise<string>((resolve) => { resolve('cancel'); });

    return new Promise<string>((resolve) => {
      remove(id).then((res) => {
        if (res.type === 'success') {
          fetchData().then(() => {
            resolve('success');
          });
        } else {
          callbackSteps(res).then((result) => {
            if (result === 'failure') resolve('failure');
            else resolve('error');
          });
        }
      });
    });
  };

  const editModeCallback = (name: string, clients: number) => new Promise((resolve) => {
    update(id, { name, clients }).then((res) => {
      if (res.type === 'success') {
        fetchData().then(() => {
          setEditMode(false);
          resolve('success');
        });
      } else {
        callbackSteps(res).then((result) => {
          if (result === 'failure') resolve('failure');
          else resolve('error');
        });
      }
    });
  });

  const index = data.columns[data.columns.length - 1] as keyof Channel;
  const row = data.channels.data[rowIndex];

  const sum = data.channels.data
    .reduce((acc: number, channel: Channel) => acc + Number(channel[index]), 0);

  const items = Object.values(row).map((item: string, itemIndex: number) => {
    const key = `channel_${row.id}_${itemIndex}_${new Date().getTime()}`;
    return <td style={style.center} key={key}>{item}</td>;
  });

  const buttons = [
    {
      variant: 'light', text: 'Delete', colspan: 1, onClick: () => { setShowModal(true); },
    },
    {
      variant: 'light', text: 'Edit', colspan: 1, onClick: () => { setEditMode(true); },
    },
  ];

  const dividend = Number(row[index]);
  const divisor = sum !== 0 ? sum : 1;

  const percent = ((dividend / divisor) * 100).toFixed(2);
  const color = data.chartColors[rowIndex];

  const percents = (
    <td style={style.button}>
      <div style={{ ...style.percents, backgroundColor: color }}>
        {percent}
        %
      </div>
    </td>
  );

  const buttonsList = buttons.map((button, buttonIndex) => {
    const tdKey = `td_${buttonIndex}_${new Date().getTime()}`;
    const buttonKey = `button_${buttonIndex}_${new Date().getTime()}`;

    return (
      <td
        key={tdKey}
        colSpan={button.colspan}
        style={style.button}
      >
        <Button
          key={buttonKey}
          onClick={button.onClick}
          onKeyDown={button.onClick}
          variant={button.variant}
        >
          {button.text}
        </Button>
      </td>
    );
  });

  const editRowElement = (
    <EditRow
      name={row.name}
      clients={row.clients}
      id={id}
      setEditMode={setEditMode}
      editModeCallback={editModeCallback}
    />
  );

  const trElement = (
    <tr>
      {items}
      {percents}
      {buttonsList}
    </tr>
  );

  return (
    <>
      {editMode ? editRowElement : trElement}
      <DeleteConfirm show={showModal} id={id} callback={deleteCallback} />
    </>
  );
}

export default TableRow;
