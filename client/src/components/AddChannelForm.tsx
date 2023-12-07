//[1]: pusty łańcuch tekstowy dodany aby naprawić liczby zaczynające się na 0 (np. 01, 02, 03)
//powiązane z: https://github.com/facebook/react/issues/9402
//usunąć łańcuch po naprawie błędu

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ColumnsProperties } from "../utils/api.d";
import { useState } from 'react';

interface Validation {
  checked: boolean;
  name:    Validator;
  clients: Validator;
}

interface Validator {
  message: string;
  isValid: boolean;
}

interface Errors {
  name: Error;
  clients: Error;
}

interface Error {
  condition: boolean;
  message:   string;
}

function AddChannelForm(props: { columns_properties: ColumnsProperties | false }) {

  const [name, setName] = useState('');
  const [clients, setClients] = useState(0);
  const [validation, setValidation] = useState<Validation>({
    checked: false,
    name: {
      message: '',
      isValid: false
    },
    clients: {
      message: '',
      isValid: false
    },
  });

  const limit = (column: string): number => {
    if (props.columns_properties) {
      return props.columns_properties[column].size;
    } else {
      return 0;
    }
  }

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length >= limit('name')) return;
    setName(value)
  };

  const clientsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clientsNumber = Number(e.target.value);
    if (clientsNumber >= limit('clients')) {
      setClients(limit('clients'));
      return;
    }
    setClients(clientsNumber);
  };

  const errorHandler = () => {
    
    const valid: Validator = {message: '', isValid: true};

    const validationObject: Validation = {checked: true, name: valid, clients: valid};

    const errors: Errors = {
      name: {
        condition: name.length !== 0 && name.length < limit('name'),
        message: 'Nazwa musi zawierać od 1 do ' + limit('name') + ' znaków'
      },
      clients: {
        condition: clients < limit('clients') && clients >= 0,
        message: 'Liczba klientów musi zawierać od 0 do ' + limit('clients') + ' znaków'
      } 
    }

    const conditions = Object.values(errors).map((error) => error.condition);

    for (const key in errors) {
      const error = errors[key as keyof Errors];

      if (error.condition) {
        validationObject[key as keyof Errors] = {message: error.message, isValid: false};
      }
    }

    setValidation(validationObject);
    
    if (conditions.includes(false)) return true;
    return false;
    
  }

  const submitHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
    // const form = e.currentTarget;
    // if (form.checkValidity() === false) {

    e.preventDefault();
    e.stopPropagation();

    const errors = errorHandler();

    if (errors) return;
    // }
    
    const data = {
      name: name,
      clients: clients
    };

    fetch('http://127.0.0.1:8000/channels/create', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => submitFeedback(res));

    setName('');
    setClients(0);

  }

  const feedbackElement = (message: string, isValid: boolean) => {
    console.log(message, isValid);
      return <Form.Control.Feedback type={isValid ? "valid" : "invalid"}>{message}</Form.Control.Feedback>
  }

  const submitFeedback = async (response: any) => {
    const status = response.status;
    const json = await response.json();
    const message = json.message;

    if (status === 209) {
      
    }

  }

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Nazwa</Form.Label>
        <Form.Control type="text" value={name} onChange={nameHandler} placeholder="Nazwa kanału" />
        <Form.Text className="text-muted">
        Podaj nazwe kanału pozyskania klienta
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Ilość klientów</Form.Label>
        <Form.Control type="number" pattern="\d+" value={clients + '' /* [1] */} onChange={clientsHandler} placeholder="Ilość klientów" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Dodaj
      </Button>
    </Form>
  );
}

export default AddChannelForm;