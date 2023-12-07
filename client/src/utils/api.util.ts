import { ApiData, CustomMessage, CustomResponse } from "../types/api.d";

const url = `http://127.0.0.1:8000`;
const channels_url = `${url}/channels`
const health_url = `${url}/status`


export const handleError = (err: Error): CustomMessage => {
    return {
        type: 'error',
        code: Number(err.name),
        message: err.message
    };
};

export const handleResponse = (response: Response, type: string = "success"): {type: string, response: Response} => {
    return {
        type: type,
        response: response
    }
}

export const update = (id: number, data: {name: string, clients: number}): Promise<CustomMessage | CustomResponse> => {

    return new Promise((resolve) => {
        fetch(`${channels_url}/update/${id}`, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => {
            if (res.ok) {
                resolve(handleResponse(res))
                return res
            }
            resolve(handleResponse(res, "failure"));
        }).catch((error) => {
            const err = handleError(error);
            resolve(err);
        });
    })
}

export const remove = (id: number ): Promise<CustomMessage | CustomResponse> => {

    return new Promise((resolve) => {
        fetch(`${channels_url}/delete/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => {
            console.log(res);
            if (res.ok) {
                resolve(handleResponse(res))
                return res
            }
            resolve(handleResponse(res, "failure"));
        }).catch((error) => {
            const err = handleError(error);
            resolve(err);
        });
    })
}

export const create = (data: {name: string, clients: number}): Promise<CustomMessage | CustomResponse>  => {
    return new Promise((resolve) => {
        fetch('http://127.0.0.1:8000/channels/create', {
          method: 'POST',
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(res => {
            if (res.ok) {
                resolve(handleResponse(res))
                return res
            };
            resolve(handleResponse(res, "failure"));
        }).catch((error) => {
          const err = handleError(error);
          resolve(err);
        });
      })
}

export const test = () => {
    return new Promise((resolve) => {
        fetch(health_url)
            .then(response => {
                if (response.ok) {
                    resolve(true);
                    return response
                };
                resolve(false);
            })
            .catch((error) => {
                resolve(false);
            });
    })
}

export const read = (limit: Number = 20, page: Number = 1): Promise<ApiData | CustomMessage> => {
    return new Promise((resolve) => {
        const urlObj = new URL(`${channels_url}/read`);

        const params = new URLSearchParams({
            limit: limit.toString(),
            page: page.toString()
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
            }
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
}