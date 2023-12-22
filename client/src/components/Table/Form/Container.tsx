import Form from 'react-bootstrap/Form';
import React, { useContext, useState } from 'react';
import { DataContext, NotificationsContext } from 'components/Wrappers/Context';
import { CustomMessage, CustomResponse } from 'utils/api.util.type';
import errorHandler from 'utils/table.util';
import { limit } from 'utils/formsValidator.util';
import { create } from 'utils/api.util';
import { TableFormProps } from 'components/Table/Form/Container.type';

function TableForm(props: TableFormProps) {
  const [clients, setClients] = useState(0);
  const [name, setName] = useState('');

  const { data, fetchData, reconnect } = useContext(DataContext);
  const { notify } = useContext(NotificationsContext);

  const columnsProperties = data ? data.columns_properties : {};
  const { children } = props;

  const submitFeedback = async (res: CustomResponse | CustomMessage) => {
    const err = (res as CustomMessage);
    if (res.type === 'error') reconnect({ code: err.code, message: err.message });

    const { status } = (res as CustomResponse).response;

    const json = await (res as CustomResponse).response.json();
    const info = { code: status, message: json.message };

    switch (status) {
      case 201:
        setName('');
        setClients(0);
        fetchData();
        break;
      default:
        notify(info, 5);
        break;
    }
  };

  const submitHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const errors = errorHandler(
      {
        name: { value: name, limit: limit(columnsProperties, 'name') },
        clients: { value: clients, limit: limit(columnsProperties, 'clients') },
      },
    );

    if (errors) {
      if (!errors.name.isValid) notify({ code: 1000, message: errors.name.message }, 5);
      if (!errors.clients.isValid) notify({ code: 1001, message: errors.clients.message }, 5);
      return;
    }

    const dataToSend = { name, clients };

    create(dataToSend).then((response) => submitFeedback(response));
  };

  const stateHandlers = {
    clients: { value: clients, set: setClients },
    name: { value: name, set: setName },
  };

  const forwardChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, stateHandlers);
    }
    return child;
  });

  return (
    <Form noValidate onSubmit={submitHandler}>
      {forwardChildren}
    </Form>
  );
}

export default TableForm;
