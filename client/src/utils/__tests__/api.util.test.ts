import { handleError, handleResponse } from "../api.util";

it("api function creates valid response and messages objects", async () => {
    const response = handleResponse(new Response("test"));
    expect(response).toHaveProperty("type");

    const error = handleError(new Error("test"));
    expect(error).toHaveProperty("type");
});

export {} // this file needs to be a module
