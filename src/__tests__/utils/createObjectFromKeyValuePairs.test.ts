import { createObjectFromKeyValuePairs } from "../../utils/createObjectFromKeyValuePairs";

describe("createObjectFromKeyValuePairs", () => {
  it("should convert an array of key-value pairs to an object", () => {
    const items = [
      { key: "Authorization", value: "Bearer token" },
      { key: "Content-Type", value: "application/json" },
    ];

    const result = createObjectFromKeyValuePairs(items);

    expect(result).toEqual({
      Authorization: "Bearer token",
      "Content-Type": "application/json",
    });
  });

  it("should return an empty object if input is an empty array", () => {
    const result = createObjectFromKeyValuePairs([]);
    expect(result).toEqual({});
  });
});
