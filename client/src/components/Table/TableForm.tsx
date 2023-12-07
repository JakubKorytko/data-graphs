import Form from 'react-bootstrap/Form';
import { DataContext, NotificationsContext } from '../Wrappers/Context';
import React, { useContext, useState } from 'react';
import * as Types from '../../types/table';
import { limit, errorHandler } from '../../utils/table.util';

const handleError = (err: Error): Types.CustomError => {
    return {
        type: 'error',
        code: Number(err.name),
        message: err.message
    };
  };

const TableForm = (props: any) => {

    const [clients, setClients] = useState(0);
    const [name, setName] = useState('');

    const {data, fetchData, reconnect} = useContext(DataContext);
    const {notify} = useContext(NotificationsContext);

    const columns_properties = data ? data.columns_properties : {};

    const submitHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
    
        e.preventDefault();
        e.stopPropagation();
    
        const errors = errorHandler(
          {name: {value: name, limit: limit(columns_properties, "name")}, 
          clients: {value: clients, limit: limit(columns_properties, "clients")}}
        );
    
        if (errors) {
          if (!errors.name.isValid) notify({code: 1000, message: errors.name.message}, 5);
          if (!errors.clients.isValid) notify({code: 1001, message: errors.clients.message}, 5);
          return;
        };
        
        const data = {
          name: name,
          clients: clients
        };
    
        new Promise((resolve, reject) => {
        fetch('http://127.0.0.1:8000/channels/create', {
          method: 'POST',
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(res => resolve(res)).catch((error) => {
          const err = handleError(error);
          resolve(err);
        });
        }).then(
          (response) => submitFeedback(response)
        )
      }

      const submitFeedback = async (response: any) => {
        const status = response.status;
        const json = await response.text();
        console.log(json);
        const info = {code: status, message: response.statusText};
        switch (status) {
          case 201:
            setName('');
            setClients(0);
            fetchData();
            break;
          case 500:
            reconnect(info);
          default:
            notify(info, 5);
            break;
        }
    }

    const stateHandlers = {
      clients: {value: clients, set: setClients},
      name: {value: name, set: setName}
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