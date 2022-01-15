import AbstractValidator from "./AbstractValidator";
import { Valid, ValidationError, ValidatorResult } from "./ValidatorResult";
import Ajv, { Schema } from "ajv";

/**
 * Validate data by a JSON schema
 *
 * @example
 * ```
 * const validator = new JsonSchemaValidator({
 *   type: "object",
 *   properties: {
 *     foo: {type: "integer"},
 *     bar: {type: "string"}
 *   },
 *   required: ["foo"],
 *   additionalProperties: false
 * });
 *
 * const validatorResult = validator.validate({foo: "3"}, bar: "bar"}); // error
 * ```
 *
 */
class JsonSchemaValidator extends AbstractValidator {
  private readonly schema: Schema;

  /**
   * Create a JsonSchemaValidator
   *
   * @param schema
   */
  constructor(schema: Schema) {
    super();
    this.schema = schema;
  }

  /**
   * Validate data
   *
   * @param data - the data to validate
   */
  validate(data: unknown): ValidatorResult {
    const ajv = new Ajv({
      strict: false,
    });

    const validate = ajv.compile(this.schema);
    const valid = validate(data);

    if (!valid) {
      const errorMessage = validate.errors
        .map((error) => error.message)
        .join(", ");
      return new ValidationError("Payload not valid: " + errorMessage);
    }

    return new Valid();
  }
}

export default JsonSchemaValidator;
