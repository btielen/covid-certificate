import { Buffer } from "buffer";
import {
  CosePayload,
  CoseProtectedHeaders,
  CoseSignature,
  CoseUnprotectedHeaders,
} from "./cose";

/**
 * A single signed COSE message
 *
 */
export class SingleSignedMessage {
  private unprotectedHeaders: CoseUnprotectedHeaders;
  private protectedHeaders: CoseProtectedHeaders;
  private payload: CosePayload;
  private signature: CoseSignature;

  /**
   * Get the array that has to be signed, defined by the COSE
   * definition. See: https://datatracker.ietf.org/doc/html/rfc8152#section-4.4
   */
  toSign(): Array<Buffer | string> {
    return ["Signature1", this.protectedHeaders, Buffer.alloc(0), this.payload];
  }

  /* Getters and setters */
  getUnprotectedHeaders(): Map<number, Buffer> {
    return this.unprotectedHeaders;
  }

  setUnprotectedHeaders(unprotectedHeaders: Map<number, Buffer>) {
    this.unprotectedHeaders = unprotectedHeaders;
  }

  getProtectedHeaders(): Buffer {
    return this.protectedHeaders;
  }

  setProtectedHeaders(protectedHeaders: Buffer) {
    this.protectedHeaders = protectedHeaders;
  }

  getPayload(): Buffer {
    return this.payload;
  }

  setPayload(payload: Buffer) {
    this.payload = payload;
  }

  getSignature(): Buffer {
    return this.signature;
  }

  setSignature(signature: Buffer) {
    this.signature = signature;
  }
}
