import { ApiData, CustomError } from "../types/api";

const url = `http://127.0.0.1:8000`;
const channels_url = `${url}/channels`
const health_url = `${url}/status`

const handleError = (err: Error): CustomError => {
    return {
        type: 'error',
        code: Number(err.name),
        message: err.message
    };
};

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

export const read = (limit: Number = 20, page: Number = 1): Promise<ApiData | CustomError> => {
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
            const data: ApiData = {...json, type: 'success'};
            resolve(data);
        })
        .catch((error) => {
            const err = handleError(error);
            resolve(err);
        });
    });
}