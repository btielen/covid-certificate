import { SingleSignedMessage } from "../cose/SingleSignedMessage";
import {
  HealthCertificate,
  RecoveredCertificate,
  TestCertificate,
  TestResult,
  VaccinationCertificate,
} from "../health-certificate/HealthCertificate";
import { decode } from "cbor";
import { schema } from "../validate/dcc/DCC-json-schema";
import ChainValidator from "../validate/ChainValidator";
import PayloadValidator from "../validate/dcc/PayloadValidator";
import DccJsonValidator from "../validate/dcc/DccJsonValidator";
import { HCertJSON, TestResultJSON } from "../health-certificate/jsonTypes";
import { extractAlgorithm, extractKid } from "../cose/header/headers";
import {
  translateAlgorithm,
  translateTarget,
  translateVaccineType,
} from "./translate";

/**
 * Parse a single signed COSE message
 *
 * @param message
 */
export const parseCoseCertificate = (
  message: SingleSignedMessage
): HealthCertificate => {
  // should be data as specified in https://github.com/ehn-dcc-development/hcert-spec
  const data = decode(message.getPayload());

  // validate data in cose message
  const validator = new ChainValidator([
    new PayloadValidator(),
    new DccJsonValidator(schema),
  ]);

  const validationResult = validator.validate(data);

  if (!validationResult.isValid()) {
    throw new Error(
      "Data in COSE message not valid: " + validationResult.getMessage()
    );
  }

  const hcertData: HCertJSON = data.get(-260).get(1);

  return {
    alg: translateAlgorithm(
      extractAlgorithm(
        message.getProtectedHeaders(),
        message.getUnprotectedHeaders()
      )
    ),
    expirationDate: new Date(data.get(4) * 1000),
    issuedAt: new Date(data.get(6) * 1000),
    dateOfBirth: hcertData.dob,
    name: {
      surname: hcertData.nam.fnt,
      givenName: hcertData.nam.gnt,
    },
    issuer: data.get(1),
    kid: extractKid(
      message.getProtectedHeaders(),
      message.getUnprotectedHeaders()
    ),
    recovered: convertRecoveredData(hcertData),
    tests: convertTestData(hcertData),
    vaccinations: convertVaccinationData(hcertData),
    version: hcertData.ver,
  };
};

/**
 * Convert recovered data into an array of RecoveredCertificate's
 *
 * @param data
 */
const convertRecoveredData = (data: HCertJSON): Array<RecoveredCertificate> => {
  if (!data.r) {
    return [];
  }

  return data.r.map((r) => {
    return {
      id: r.ci,
      target: translateTarget(r.tg),
      firstDetectedDate: new Date(r.fr),
      countryOfTest: r.co,
      issuer: r.is,
      dateValidFrom: new Date(r.df),
      dateValidUntil: new Date(r.du),
    };
  });
};

const convertVaccinationData = (
  data: HCertJSON
): Array<VaccinationCertificate> => {
  if (!data.v) {
    return [];
  }

  return data.v.map((v) => {
    return {
      target: translateTarget(v.tg),
      vaccineType: translateVaccineType(v.vp),
      medicinalProduct: v.mp,
      manufacturer: v.ma,
      doseNumber: v.dn,
      totalDoses: v.sd,
      date: new Date(v.dt),
      country: v.co,
      issuer: v.is,
      id: v.ci,
    };
  });
};

const convertTestData = (data: HCertJSON): Array<TestCertificate> => {
  if (!data.t) {
    return [];
  }

  return data.t.map((t) => {
    return {
      target: translateTarget(t.tg),
      testType: t.tt,
      name: t.nm || "",
      manufacturer: t.ma || "",
      date: new Date(t.sc),
      result:
        t.tr === TestResultJSON.Detected
          ? TestResult.Detected
          : TestResult.Undetected,
      testingCentre: t.tc || "",
      country: t.co,
      issuer: t.is,
      id: t.ci,
    };
  });
};
