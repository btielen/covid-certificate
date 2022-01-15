import { CoseProtectedHeaders, CoseUnprotectedHeaders } from "../cose";
import { extractHeader } from "./extractHeader";
import { Header } from "../header";

/**
 * Extract kid
 *
 * @param protectedHeaders
 * @param unprotectedHeaders
 */
export const extractKid = (
  protectedHeaders: CoseProtectedHeaders,
  unprotectedHeaders: CoseUnprotectedHeaders
): string => {
  const kid = extractHeader(protectedHeaders, unprotectedHeaders, Header.kid);

  if (!Buffer.isBuffer(kid)) {
    throw new Error("kid header is not a buffer");
  }

  return kid.toString("base64");
};

/**
 * Extract algorithm
 *
 * @param protectedHeaders
 * @param unprotectedHeaders
 */
export const extractAlgorithm = (
  protectedHeaders: CoseProtectedHeaders,
  unprotectedHeaders: CoseUnprotectedHeaders
): number => {
  const alg = extractHeader(
    protectedHeaders,
    unprotectedHeaders,
    Header.algorithm
  );

  if (typeof alg !== "number") {
    throw new Error("Algorithm header is not a number");
  }

  return alg;
};
