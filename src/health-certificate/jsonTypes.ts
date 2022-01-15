export type HCertJSON = {
  nam: Name;
  dob: string;
  v?: Array<VaccinatedCertificateJSON>;
  t?: Array<TestCertificateJSON>;
  r?: Array<RecoveredCertificateJSON>;
  ver: string;
};

export type Name = {
  fnt: string;
  fn?: string;
  gn?: string;
  gnt?: string;
};

export type VaccinatedCertificateJSON = {
  tg: TargetJSON;
  vp: VaccineTypeJSON;
  mp: string;
  ma: string;
  dn: number;
  sd: number;
  dt: string;
  co: string;
  is: string;
  ci: string;
};

export type RecoveredCertificateJSON = {
  ci: string;
  is: string;
  co: string;
  tg: TargetJSON;
  fr: string;
  df: string;
  du: string;
};

export type TestCertificateJSON = {
  tg: TargetJSON;
  tt: string;
  nm?: string;
  ma?: string;
  sc: string;
  tr: TestResultJSON;
  tc?: string;
  co: string;
  is: string;
  ci: string;
};

// see: https://github.com/ehn-dcc-development/ehn-dcc-valuesets
export enum TestResultJSON {
  Detected = "260373001",
  Undetected = "260415000",
}

export enum TargetJSON {
  "COVID-19" = "840539006",
}

export enum VaccineTypeJSON {
  "SARS-CoV-2 mRNA vaccine" = "1119349007",
  "SARS-CoV-2 antigen vaccine" = "1119305005",
  "covid-19 vaccines" = "J07BX03",
}
