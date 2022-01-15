import { IssuerCertificateData } from "./certificates";
import { KeyObject, X509Certificate } from "crypto";

export const createPublicKey = (
  issuerCertificate: IssuerCertificateData
): KeyObject => {
  const cert = new X509Certificate(addPEMTags(issuerCertificate.rawData));

  return cert.publicKey;
};

const addPEMTags = (certificate: string): string => {
  return `-----BEGIN CERTIFICATE-----
${certificate}
-----END CERTIFICATE-----`;
};
