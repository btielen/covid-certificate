import { Valid, ValidationError, ValidatorResult } from "../ValidatorResult";
import AbstractCoseValidator from "./AbstractCoseValidator";
import { SingleSignedMessage } from "../../cose/SingleSignedMessage";
import { extractKid } from "../../cose/header/headers";

class HasKidValidator extends AbstractCoseValidator {
  validate(data: SingleSignedMessage): ValidatorResult {
    const unprotectedHeaders = data.getUnprotectedHeaders();
    const protectedHeaders = data.getProtectedHeaders();

    let kid = "";

    // try to extract kid from the headers
    try {
      kid = extractKid(protectedHeaders, unprotectedHeaders);
    } catch (error) {
      return new ValidationError("No kid in headers");
    }

    if (kid.length === 0) {
      return new ValidationError("Kid is an empty string");
    }

    return new Valid();
  }
}

export default HasKidValidator;
