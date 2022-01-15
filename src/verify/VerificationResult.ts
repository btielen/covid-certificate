export abstract class VerificationResult {
  abstract isValid(): boolean;
  abstract getMessage(): string;
}

export class Valid extends VerificationResult {
  isValid(): boolean {
    return true;
  }

  getMessage(): string {
    return "";
  }
}

export class VerificationError extends VerificationResult {
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
