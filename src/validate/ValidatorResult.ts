export abstract class ValidatorResult {
  abstract isValid(): boolean;
  abstract getMessage(): string;
}

export class Valid extends ValidatorResult {
  isValid(): boolean {
    return true;
  }

  getMessage(): string {
    return "";
  }
}

export class ValidationError extends ValidatorResult {
  private readonly errorMessage: string;

  constructor(errorMessage: string) {
    super();
    this.errorMessage = errorMessage;
  }

  isValid(): boolean {
    return false;
  }

  getMessage(): string {
    return this.errorMessage;
  }
}
