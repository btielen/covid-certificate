import { certificates, IssuerCertificateData } from "./certificates";

export const findCertificateData = (
  kid: string
): IssuerCertificateData | null => {
  const cert = certificates.find((cert) => cert.kid === kid);

  if (!cert) {
    return null;
  }

  return cert;
};
