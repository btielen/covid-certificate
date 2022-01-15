import AbstractCborValidator from "./AbstractCborValidator";
import { Valid, ValidationError, ValidatorResult } from "../ValidatorResult";

class IsCoseSingleSignedMessageValidator extends AbstractCborValidator {
  validate(data: unknown): ValidatorResult {
    if (typeof data !== "object") {
      return new ValidationError("Given data is not an object");
    }

    const d = Object.assign({ tag: 0, value: [] }, data);

    if (d.tag !== 18) {
      return new ValidationError(
        "Given data is not a COSE Single Signer Data Object"
      );
    }

    if (!Array.isArray(d.value) || d.value.length !== 4) {
      return new ValidationError(
        "Given data doesn't have a value array with length 4"
      );
    }

    return new Valid();
  }
}

export default IsCoseSingleSignedMessageValidator;
