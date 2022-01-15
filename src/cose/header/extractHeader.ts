import { CoseProtectedHeaders, CoseUnprotectedHeaders } from "../cose";
import { headerFromProtectedHeaders } from "./headerFromProtectedHeaders";
import { headerFromMap } from "./headerFromMap";

/**
 * Get a header value from the COSE headers.
 *
 * If both protected and unprotected headers give the header, the
 * function will return the kid given in the  protected header
 *
 *
 * @param protectedHeaders
 * @param unprotectedHeaders
 * @param headerKey
 */
export const extractHeader = (
  protectedHeaders: CoseProtectedHeaders,
  unprotectedHeaders: CoseUnprotectedHeaders,
  headerKey: number
): unknown => {
  let header = null;

  try {
    header = headerFromProtectedHeaders(protectedHeaders, headerKey);
  } catch (error) {
    try {
      header = headerFromMap(unprotectedHeaders, headerKey);
    } catch (error) {
      throw new Error("No header found");
    }
  }

  return header;
};
