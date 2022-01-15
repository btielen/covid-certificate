import IsCoseSingleSignedMessageValidator from "./IsCoseSingleSignedMessageValidator";
import { ValidatorResult } from "../ValidatorResult";

describe("COSE single signed message validator", () => {
  test("instance of ValidatorResult", () => {
    const v = new IsCoseSingleSignedMessageValidator();
    expect(v.validate("no object")).toBeInstanceOf(ValidatorResult);
  });

  test("no object = false", () => {
    const v = new IsCoseSingleSignedMessageValidator();
    expect(v.validate("no object").isValid()).toBe(false);
  });

  test("wrong tag = false", () => {
    const v = new IsCoseSingleSignedMessageValidator();
    expect(v.validate({ tag: 42 }).isValid()).toBe(false);
  });

  test("values is not an array of 4", () => {
    const v = new IsCoseSingleSignedMessageValidator();
    expect(v.validate({ tag: 18, value: [1, 2, 3] }).isValid()).toBe(false);
  });

  test("valid data", () => {
    const v = new IsCoseSingleSignedMessageValidator();
    expect(v.validate({ tag: 18, value: [1, 2, 3, 4] }).isValid()).toBe(true);
  });
});
