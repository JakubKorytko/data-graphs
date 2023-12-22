import {
  ApiData, CreateFunction, CustomMessage, ReadFunction, RemoveFunction, UpdateFunction,
} from 'utils/api.util.type';

const url = 'http://127.0.0.1:8000';
const channelsUrl = `${url}/channels`;
const healthUrl = `${url}/status`;

export const handleError = (err: Error): CustomMessage => ({
  type: 'error',
  code: Number(err.name),
  message: err.message,
});

export const handleResponse = (response: Response, type: string = 'success'): { type: string, response: Response } => ({
  type,
  response,
});

export const update: UpdateFunction = (id, data) => new Promise((resolve) => {
  fetch(`${channelsUrl}/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      resolve(handleResponse(res));
      return res;
    }
    resolve(handleResponse(res, 'failure'));
    return res;
  }).catch((error) => {
    const err = handleError(error);
    resolve(err);
  });
});

export const remove: RemoveFunction = (id) => new Promise((resolve) => {
  fetch(`${channelsUrl}/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => {
    if (res.ok) {
      resolve(handleResponse(res));
      return res;
    }
    resolve(handleResponse(res, 'failure'));
    return res;
  }).catch((error) => {
    const err = handleError(error);
    resolve(err);
  });
});

export const create: CreateFunction = (data) => new Promise((resolve) => {
  fetch('http://127.0.0.1:8000/channels/create', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      resolve(handleResponse(res));
      return res;
    }
    resolve(handleResponse(res, 'failure'));
    return res;
  }).catch((error) => {
    const err = handleError(error);
    resolve(err);
  });
});

export const test = () => new Promise((resolve) => {
  fetch(healthUrl)
    .then((response) => {
      if (response.ok) {
        resolve(true);
        return response;
      }
      resolve(false);
      return response;
    })
    .catch(() => {
      resolve(false);
    });
});

export const read: ReadFunction = (limit = 20, page = 1) => new Promise((resolve) => {
  const urlObj = new URL(`${channelsUrl}/read`);

  const params = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
  });

  urlObj.search = params.toString();

  fetch(urlObj).then(
    (response) => {
      if (response.ok) {
        return response;
      }
      const error = new Error(response.statusText);
      error.name = response.status.toString();
      throw error;
    },
  )
    .then((response) => response.json())
    .then((json) => {
      const data: ApiData = { ...json, type: 'success' };
      resolve(data);
    })
    .catch((error) => {
      const err = handleError(error);
      resolve(err);
    });
});
