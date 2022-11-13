const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    const data = JSON.stringify(event);
    candidate = event.partitionKey
      ? event.partitionKey
      : crypto.createHash("sha3-512").update(data).digest("hex");

    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
    // creates hash of partition key if length > 256 - this will never apply if no event because event will always be "TRIVIAL_PARTITION_KEY"
    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
    }
  } else {
    // will only reach here if no event
    candidate = TRIVIAL_PARTITION_KEY;
  }
  return candidate;
};

exports.deterministicPartitionKeyOriginal = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      // if event has no partitionKey, the event is stringified and a hash is created
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    // will only reach here if no event
    candidate = TRIVIAL_PARTITION_KEY;
  }
  // creates hash of partition key if length > 256
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};
