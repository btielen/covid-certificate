import { CoseProtectedHeaders } from "../cose";
import { decode } from "cbor";
import { headerFromMap } from "./headerFromMap";

export const headerFromProtectedHeaders = (
  headers: CoseProtectedHeaders,
  key: number
): unknown => {
  const map = decode(headers);

  if (!(map instanceof Map)) {
    throw Error("Protected headers is not cbor encoded map");
  }

  return headerFromMap(map, key);
};
