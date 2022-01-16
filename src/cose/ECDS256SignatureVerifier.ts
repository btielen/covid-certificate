import { SingleSignedMessage } from "./SingleSignedMessage";
import { encode } from "cbor";
import { Crypto } from "@peculiar/webcrypto";

class ECDS256SignatureVerifier {
  async verify(message: SingleSignedMessage, publicKey: ArrayBuffer) {
    const ToBeSigned = encode(message.toSign());

    const crypto = new Crypto();

    const pk = await crypto.subtle.importKey(
      "spki",
      publicKey,
      { name: "ECDSA", namedCurve: "P-256" },
      true,
      ["verify"]
    );

    return await crypto.subtle.verify(
      { name: "ECDSA", hash: "SHA-256" },
      pk,
      message.getSignature(),
      ToBeSigned
    );
  }
}

export default ECDS256SignatureVerifier;
