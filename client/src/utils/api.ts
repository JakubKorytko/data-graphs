import { ApiData } from "./api.d";

const url = `http://127.0.0.1:8000/channels`;

const read = async (limit: Number = 20, page: Number = 1): Promise<ApiData> => {
    const urlObj = new URL(`${url}/read`);

    const params = new URLSearchParams({ 
        limit: limit.toString(), 
        page: page.toString()
    });

    urlObj.search = params.toString();

    console.log(urlObj.href);

    const response = await fetch(urlObj);
    const json: ApiData = await response.json();

    return json;
}

export {
    read
}