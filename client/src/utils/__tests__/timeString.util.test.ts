import generateTime from "../timeString.util";

test("time string should be proper string", () => {
    const timeString = generateTime(Date.now());
    expect(timeString).toMatch(/^(less than a second ago|(\d{1,2}) seconds ago|(\d{1,2}) minutes ago|(\d{1,2}) hours ago|more than a day ago)$/);
})

export {} // this file needs to be a module