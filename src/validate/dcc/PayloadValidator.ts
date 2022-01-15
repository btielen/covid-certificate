import AbstractValidator from "../AbstractValidator";
import { Valid, ValidationError, ValidatorResult } from "../ValidatorResult";

class PayloadValidator extends AbstractValidator {
  validate(data: Map<number, unknown>): ValidatorResult {
    if (!(data instanceof Map)) {
      return new ValidationError("Data is not a map");
    }

    if (!data.has(-260) || !(data.get(-260) instanceof Map)) {
      return new ValidationError("Invalid structure: data[-260] is not a map");
    }

    const s = data.get(-260) as Map<number, unknown>;

    if (!s.has(1) || typeof s.get(1) !== "object") {
      return new ValidationError(
        "Invalid structure: data[-260][1] is not a map"
      );
    }

    return new Valid();
  }
}

export default PayloadValidator;
