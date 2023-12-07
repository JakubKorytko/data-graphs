import { generate } from "../notification.util";

test("notification should be proper object", () => {

    const notification = generate(1000, "test");
    expect(notification.title).toBe("Wrong name");

    const second_Notification = generate(400, "test");
    expect(second_Notification.body).toBe("test");
})

export {} // this file needs to be a module