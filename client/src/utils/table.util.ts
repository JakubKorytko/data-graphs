import * as Types from 'utils/table.util.type';
import { ErrorHandlerFunction } from 'utils/table.util.type';

const errorHandler: ErrorHandlerFunction = (data) => {
  const { name, clients } = data;

  const valid: Types.Validator = { message: '', isValid: true };

  const validationObject: Types.Validation = { checked: true, name: valid, clients: valid };

  const errors: Types.Errors = {
    name: {
      condition: name.value.length !== 0 && name.value.length < name.limit,
      message: `The name must contain 1 to ${name.limit} characters`,
    },
    clients: {
      condition: clients.value < clients.limit && clients.value >= 0,
      message: `The number of clients must be a number between 0 and ${clients.limit}`,
    },
  };

  const conditions = Object.values(errors).map((error) => error.condition);

  const errorsKeys = Object.keys(errors);

  errorsKeys.forEach((key) => {
    const error = errors[key as keyof Types.Errors];

    if (!error.condition) {
      validationObject[key as keyof Types.Errors] = { message: error.message, isValid: false };
    }
  });

  if (conditions.includes(false)) return validationObject;
  return false;
};

export default errorHandler;
