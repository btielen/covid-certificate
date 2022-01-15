import { Valid, ValidationError, ValidatorResult } from "../ValidatorResult";
import { CoseAlgorithm } from "../../cose/algorithms";
import AbstractCoseValidator from "./AbstractCoseValidator";
import { SingleSignedMessage } from "../../cose/SingleSignedMessage";
import { extractAlgorithm } from "../../cose/header/headers";

class KnownAlgorithmValidator extends AbstractCoseValidator {
  validate(data: SingleSignedMessage): ValidatorResult {
    const unprotectedHeaders = data.getUnprotectedHeaders();
    const protectedHeader = data.getProtectedHeaders();

    let alg: number;
    try {
      alg = extractAlgorithm(protectedHeader, unprotectedHeaders);
    } catch (error) {
      return new ValidationError("Algorithm not set in headers");
    }

    if (alg !== CoseAlgorithm.ECDS_256) {
      return new ValidationError("Algorithm is not known");
    }

    return new Valid();
  }
}

export default KnownAlgorithmValidator;
