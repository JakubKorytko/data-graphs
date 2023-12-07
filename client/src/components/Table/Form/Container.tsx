import { ApiData, CustomMessage, CustomResponse } from "../../../types/api.d";
import Form from 'react-bootstrap/Form';
import { DataContext, NotificationsContext } from '../../Wrappers/Context';
import React, { useContext, useState } from 'react';
import { errorHandler } from '../../../utils/table.util';
import { limit } from '../../../utils/formsValidator.util';
import { create } from '../../../utils/api.util';

const TableForm = (props: any) => {

  const [clients, setClients] = useState(0);
  const [name, setName] = useState('');

  const { data, fetchData, reconnect } = useContext(DataContext);
  const { notify } = useContext(NotificationsContext);

  const columns_properties = data ? data.columns_properties : {};

  const submitHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {

    e.preventDefault();
    e.stopPropagation();

    const errors = errorHandler(
      {
        name: { value: name, limit: limit(columns_properties, "name") },
        clients: { value: clients, limit: limit(columns_properties, "clients") }
      }
    );

    if (errors) {
      if (!errors.name.isValid) notify({ code: 1000, message: errors.name.message }, 5);
      if (!errors.clients.isValid) notify({ code: 1001, message: errors.clients.message }, 5);
      return;
    };

    const data = {name, clients};

    create(data).then(response => submitFeedback(response))
  }

  const submitFeedback = async (res: CustomResponse | CustomMessage) => {
    const err = (res as CustomMessage);
    if (res.type == 'error') reconnect({ code: err.code, message: err.message});


    const status = (res as CustomResponse).response.status;

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
  }

  const stateHandlers = {
    clients: { value: clients, set: setClients },
    name: { value: name, set: setName }
  }

  const children = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, stateHandlers);
    }
    return child;
  });

  return (
    <Form noValidate onSubmit={submitHandler}>
      {children}
    </Form>
  )
}

export default TableForm;