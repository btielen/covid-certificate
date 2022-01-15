import { SingleSignedMessage } from "./SingleSignedMessage";
import { ec as EC } from "elliptic";
import { encode } from "cbor";
import { createHash, KeyObject } from "crypto";

class ECDS256SignatureVerifier {
  verify(message: SingleSignedMessage, publicKey: KeyObject) {
    const ToBeSigned = encode(message.toSign());

    // Hash
    const hash = createHash("sha256");
    hash.update(ToBeSigned);
    const msgHash = hash.digest();

    // Elliptic curve
    const ec = new EC("p256");

    // Elliptic curve expects a public key object { x: string, y: string }
    // with hex encoded strings
    const pk = publicKey.export({ format: "jwk" });
    const key = ec.keyFromPublic({
      x: Buffer.from(pk.x + "=", "base64").toString("hex"),
      y: Buffer.from(pk.y + "=", "base64").toString("hex"),
    });

    const expectedSignature = message.getSignature();
    const sig = {
      r: expectedSignature.slice(0, expectedSignature.length / 2),
      s: expectedSignature.slice(expectedSignature.length / 2),
    };

    return key.verify(msgHash, sig);
  }
}

export default ECDS256SignatureVerifier;
