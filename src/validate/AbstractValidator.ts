import { ValidatorResult } from "./ValidatorResult";

abstract class AbstractValidator {
  abstract validate(data: unknown): ValidatorResult;
}

export default AbstractValidator;
