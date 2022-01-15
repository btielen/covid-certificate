import { encode } from "cbor";
import { extractHeader } from "./extractHeader";
import { Buffer } from "buffer";
import { Header } from "../header";

describe("extract kid from cose headers", () => {
  test("from unprotected header", () => {
    const protectedHeaders = Buffer.alloc(0);
    const unprotectedHeaders = new Map();
    unprotectedHeaders.set(Header.kid, encode("some_kid"));

    expect(
      extractHeader(protectedHeaders, unprotectedHeaders, Header.kid)
    ).toBeInstanceOf(Buffer);
  });

  test("from protected header", () => {
    const map = new Map();
    map.set(Header.kid, "some_kid");
    const protectedHeaders = encode(map);
    const unprotectedHeaders = new Map();

    expect(
      extractHeader(protectedHeaders, unprotectedHeaders, Header.kid)
    ).toBe("some_kid");
  });

  test("prefers protected kid", () => {
    const map = new Map();
    map.set(Header.kid, "some_kid");
    const protectedHeaders = encode(map);
    const unprotectedHeaders = new Map();
    unprotectedHeaders.set(Header.kid, encode("some_other_unprotected_kid"));

    expect(
      extractHeader(protectedHeaders, unprotectedHeaders, Header.kid)
    ).toBe("some_kid");
  });

  test("throws error when no kid is given in the headers", () => {
    const protectedHeaders = Buffer.alloc(0);
    const unprotectedHeaders = new Map();

    expect(() =>
      extractHeader(protectedHeaders, unprotectedHeaders, Header.kid)
    ).toThrow("No header found");
  });
});
