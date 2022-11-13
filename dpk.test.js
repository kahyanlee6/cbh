const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns the event.partitionKey if partitionKey exists,is a string,and length is < 256", () => {
    const event = {
      partitionKey: "12c3rtb45jk",
    };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(event.partitionKey);
  });
  it("Returns a created hash of the event if there is an event but no partitionKey in event object", () => {
    const event = {};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey.length).toBeLessThan(256);
  });
  it("Returns a created hash of the partitionKey if partitionKey length is > 256", () => {
    let key = "";
    for (let i = 0; i < 270; i++) {
      key += `${i}`;
    }
    const event = {
      partitionKey: key,
    };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey.length).toBeLessThan(256);
  });
  it("Returns a stringified version of partitionKey if partitionKey is not a string", () => {
    const event = {
      partitionKey: 102345678,
    };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("102345678");
  });
});
