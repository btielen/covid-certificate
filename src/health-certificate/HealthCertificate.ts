/**
 * Electronic Health Certificate Specification
 *
 */
export type HealthCertificate = {
  kid: string;
  alg: Algorithm;
  issuer: string;
  expirationDate: Date;
  issuedAt: Date;
  dateOfBirth: string;
  name: Name;
  vaccinations: Array<VaccinationCertificate>;
  tests: Array<TestCertificate>;
  recovered: Array<RecoveredCertificate>;
  version: string;
};

export type Name = {
  surname: string;
  givenName?: string;
};

export type VaccinationCertificate = {
  target: Target;
  vaccineType: VaccineType;
  medicinalProduct: string;
  manufacturer: string;
  doseNumber: number;
  totalDoses: number;
  date: Date;
  country: string;
  issuer: string;
  id: string;
};

export enum TestResult {
  Detected = "DETECTED",
  Undetected = "UNDETECTED",
}

export type TestCertificate = {
  target: Target;
  testType: string;
  name: string;
  manufacturer: string;
  date: Date;
  result: TestResult;
  testingCentre: string;
  country: string;
  issuer: string;
  id: string;
};

export type RecoveredCertificate = {
  id: string;
  target: Target;
  firstDetectedDate: Date;
  countryOfTest: string;
  issuer: string;
  dateValidFrom: Date;
  dateValidUntil: Date;
};

export enum Target {
  "COVID-19" = "COVID-19",
}

export enum VaccineType {
  "MRNA" = "MRNA",
  "ANTIGEN" = " ANTIGEN",
  "GENERAL" = "GENERAL",
}

export enum Algorithm {
  /**
   * Elliptic curve digital signing algorithm with sha256 hash
   */
  "ECDSA-256" = "ECDSA-256",
}
