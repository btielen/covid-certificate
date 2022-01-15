import JsonSchemaValidator from "../JsonSchemaValidator";
import { ValidatorResult } from "../ValidatorResult";

class DccJsonValidator extends JsonSchemaValidator {
  validate(data: Map<number, Map<number, object>>): ValidatorResult {
    return super.validate(data.get(-260).get(1));
  }
}

export default DccJsonValidator;
