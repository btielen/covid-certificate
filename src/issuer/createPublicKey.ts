import { IssuerCertificateData } from "./certificates";
import * as x509 from "@peculiar/x509";

export const createPublicKey = (
  issuerCertificate: IssuerCertificateData
): ArrayBuffer => {
  const cert2 = new x509.X509Certificate(issuerCertificate.rawData);

  return cert2.publicKey.rawData;
};
