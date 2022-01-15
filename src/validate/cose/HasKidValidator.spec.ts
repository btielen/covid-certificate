import HasKidValidator from "./HasKidValidator";
import { SingleSignedMessage } from "../../cose/SingleSignedMessage";
import { encode } from "cbor";
import { Buffer } from "buffer";

describe("Kid validator", () => {
  test("validates true if kid in unprotected headers", () => {
    const protectedHeaders = new Map();
    const unprotectedHeaders = new Map();
    unprotectedHeaders.set(4, encode("some_kid"));

    const message = createMessage(protectedHeaders, unprotectedHeaders);

    const validator = new HasKidValidator();
    expect(validator.validate(message).isValid()).toBe(true);
  });

  test("validates true if kid in protected headers", () => {
    const protectedHeaders = new Map();
    const unprotectedHeaders = new Map();
    protectedHeaders.set(4, encode("some_kid"));

    const message = createMessage(protectedHeaders, unprotectedHeaders);

    const validator = new HasKidValidator();
    expect(validator.validate(message).isValid()).toBe(true);
  });

  test("validates false if no kid", () => {
    const protectedHeaders = new Map();
    const unprotectedHeaders = new Map();

    const message = createMessage(protectedHeaders, unprotectedHeaders);

    const validator = new HasKidValidator();
    expect(validator.validate(message).isValid()).toBe(false);
  });
});

const createMessage = (p: Map<number, Buffer>, u: Map<number, Buffer>) => {
  const message = new SingleSignedMessage();
  message.setProtectedHeaders(encode(p));
  message.setUnprotectedHeaders(u);

  return message;
};
