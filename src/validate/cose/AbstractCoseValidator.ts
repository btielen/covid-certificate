import AbstractValidator from "../AbstractValidator";
import { ValidatorResult } from "../ValidatorResult";
import { SingleSignedMessage } from "../../cose/SingleSignedMessage";

abstract class AbstractCoseValidator extends AbstractValidator {
  abstract validate(data: SingleSignedMessage): ValidatorResult;
}

export default AbstractCoseValidator;
