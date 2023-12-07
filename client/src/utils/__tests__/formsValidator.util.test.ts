import { validators } from '../formsValidator.util';

test("proper name and clients number should return values back", () => {
    const columns_properties = {
        name: { type: "string", size: 10 },
        clients: { type: "integer", size: 10 }
    }

    const name = validators.name(columns_properties, "test");
    const clients = validators.clients(columns_properties, "5");

    expect(name).toBe("test");
    expect(clients).toBe(5);
});

export {} // this file needs to be a module