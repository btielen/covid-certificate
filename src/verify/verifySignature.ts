import { findCertificateData } from "../issuer/findCertificateData";
import { createPublicKey } from "../issuer/createPublicKey";
import {
  Valid,
  VerificationError,
  VerificationResult,
} from "./VerificationResult";
import ECDS256SignatureVerifier from "../cose/ECDS256SignatureVerifier";
import ChainValidator from "../validate/ChainValidator";
import KnownAlgorithmValidator from "../validate/cose/KnownAlgorithmValidator";
import HasKidValidator from "../validate/cose/HasKidValidator";
import { SingleSignedMessage } from "../cose/SingleSignedMessage";
import { extractKid } from "../cose/header/headers";

export const verifySignature = (
  certificate: SingleSignedMessage
): VerificationResult => {
  // Validate COSE message
  const validator = new ChainValidator([
    new KnownAlgorithmValidator(),
    new HasKidValidator(),
  ]);

  const validationResult = validator.validate(certificate);

  if (!validationResult.isValid()) {
    return new VerificationError(
      "COSE is not valid: " + validationResult.getMessage()
    );
  }

  // Find issuer certificate
  let kid: string;
  try {
    kid = extractKid(
      certificate.getProtectedHeaders(),
      certificate.getUnprotectedHeaders()
    );
  } catch (error) {
    return new VerificationError(
      "There is no kid found in the headers of the cose message"
    );
  }

  const issuerCert = findCertificateData(kid);

  if (issuerCert === null) {
    return new VerificationError("Unknown Issuer certificate with kid " + kid);
  }

  const sigVerifier = new ECDS256SignatureVerifier();
  const verificationResult = sigVerifier.verify(
    certificate,
    createPublicKey(issuerCert)
  );

  if (!verificationResult)
    return new VerificationError("Signature is tempered");

  return new Valid();
};
