import { TargetJSON, VaccineTypeJSON } from "../health-certificate/jsonTypes";
import {
  Algorithm,
  Target,
  VaccineType,
} from "../health-certificate/HealthCertificate";
import { CoseAlgorithm } from "../cose/algorithms";

export const translateTarget = (target: TargetJSON): Target => {
  const t = {
    [TargetJSON["COVID-19"]]: Target["COVID-19"],
  };

  return t[target];
};

export const translateVaccineType = (type: VaccineTypeJSON): VaccineType => {
  const t = {
    [VaccineTypeJSON["covid-19 vaccines"]]: VaccineType.GENERAL,
    [VaccineTypeJSON["SARS-CoV-2 mRNA vaccine"]]: VaccineType.MRNA,
    [VaccineTypeJSON["SARS-CoV-2 antigen vaccine"]]: VaccineType.ANTIGEN,
  };

  return t[type];
};

export const translateAlgorithm = (alg: CoseAlgorithm): Algorithm => {
  const t = {
    [CoseAlgorithm.ECDS_256]: Algorithm["ECDSA-256"],
  };

  return t[alg];
};
