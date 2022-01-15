import { headerFromProtectedHeaders } from "./headerFromProtectedHeaders";
import { encode } from "cbor";

test("it finds the kid", () => {
  const headers = new Map();
  headers.set(4, "some_kid");

  expect(headerFromProtectedHeaders(encode(headers), 4)).toBe("some_kid");
});

test("it throws error when headers is not a map", () => {
  const headers = "invalid_headers";
  const encoded = encode(headers);

  expect(() => {
    headerFromProtectedHeaders(encoded, 4);
  }).toThrow("Protected headers is not cbor encoded map");
});
