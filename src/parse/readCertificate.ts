import { SingleSignedMessage } from "../cose/SingleSignedMessage";
import { inflate as zlib_inflate } from "pako";
import { decode as base45_decode } from "./base45";
import { strip_header } from "./strip_header";
import { decode as cbor_decode } from "cbor";
import ChainValidator from "../validate/ChainValidator";
import IsCoseSingleSignedMessageValidator from "../validate/cbor/IsCoseSingleSignedMessageValidator";

/**
 * Parse a certificate string into a COSE single signed message
 *
 * @example
 * Here is an example:
 * ```
 * const cert = readCertificate("HC1:data_from_QR_scanner");
 * ```
 *
 * @param certificate - The base45 encoded, zlib deflated, CBor encoded string. Normally one can obtain
 * such string by scanning a QR-code
 */
export const readCertificate = (certificate: string): SingleSignedMessage => {
  const coseMessage = zlib_inflate(base45_decode(strip_header(certificate)));
  const data = cbor_decode(coseMessage);

  // Create validator
  const cborValidator = new ChainValidator([
    new IsCoseSingleSignedMessageValidator(),
  ]);

  // Validate data
  const validationResult = cborValidator.validate(data);

  if (!validationResult.isValid()) {
    throw new Error(
      "Given certificate string not valid: " + validationResult.getMessage()
    );
  }

  // Create single signed cose message
  const [protectedHeaders, unprotectedHeaders, payload, signature] = data.value;
  const message = new SingleSignedMessage();
  message.setProtectedHeaders(protectedHeaders);
  message.setUnprotectedHeaders(unprotectedHeaders);
  message.setPayload(payload);
  message.setSignature(signature);

  return message;
};
