# Digital Covid Certificate

![typescript](https://img.shields.io/npm/types/typescript)
![node](https://img.shields.io/node/v/covid-certificate)

This package will parse and verify a European Digital Covid Certificates (DCC). Certificates in the form
of QR-codes are being handed down to all vaccinated, recovered or tested citizens of the European Union.

## Installation

You can install this package by using your favourite package manager

`npm install covid-certificate --save`

### Webpack >= 5.0

Webpack < 5 used to include polyfills for node.js core modules by default.
This is no longer the case. You will need to install and configure the polyfills
yourself if you are using this package in the browser. For example by using the `node-polyfill-webpack-plugin`

`npm install node-polyfill-webpack-plugin`

configure `webpack.config.js`

```js
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
	// Other rules...
	plugins: [
          new NodePolyfillPlugin()
	]
}
```

## Getting started

This package can parse and verify the signature of digital covid certificate

### Signature verification

To verify a certificate:

```js
import { readCertificate } from "covid-certificate";

const cert = readCertificate("HC1:your_certificate_from_QR_code_scanner");
const verfificationResult = verifySignature(cert);

if (!verfificationResult.isValid()) {
  console.log(verfificationResult.getMessage());
}
```

### Parsing certificate

Parsing the certificate will give you access to all the data inside the
certificate. Before parsing it is recommended to verify the signature!

```js
import { parse } from "covid-certificate";

const healthCertificate = parse("HC1:certificate_data_from_QR_code");
console.log(healthCertificate);
```

## HealthCertificate

The HealthCertificate contains the following data

| Property       | Type   | Description                                |
|----------------|--------|--------------------------------------------|
| kid            | string | The unique id of the issuer                |
| alg            | string | The algorithm used to sign the certificate |
| expirationDate | Date   | Expiration date of certificate             |
| issuedAt       | Date   | Certificate issued at date                 |
| dateOfBirth    | string | Date of birth                              |
| name           | string | Name of the person                         |
| vaccinations   | array  | The vaccinations                           |
| recovered      | array  | Recovery data                              |
| tests          | array  | Test data                                  |
| version        | string | Version                                    |

## Full example

Following full example will give you a guide on how to use this library.

```js
import { readCertificate, parseCoseCertificate, verifySignature } from "covid-certificate";

const cert = readCertificate(
  "HC1:6BF+70790T9WJWG.FKY*4GO0.O1CV2 O5 N2FBBRW1*70HS8WY04AC*WIFN0AHCD8KD97TK0F90KECTHGWJC0FDC:5AIA%G7X+AQB9746HS80:54IBQF60R6$A80X6S1BTYACG6M+9XG8KIAWNA91AY%67092L4WJCT3EHS8XJC +DXJCCWENF6OF63W5NW6WF6%JC QE/IAYJC5LEW34U3ET7DXC9 QE-ED8%E.JCBECB1A-:8$96646AL60A60S6Q$D.UDRYA 96NF6L/5QW6307KQEPD09WEQDD+Q6TW6FA7C466KCN9E%961A6DL6FA7D46JPCT3E5JDLA7$Q6E464W5TG6..DX%DZJC6/DTZ9 QE5$CB$DA/D JC1/D3Z8WED1ECW.CCWE.Y92OAGY8MY9L+9MPCG/D5 C5IA5N9$PC5$CUZCY$5Y$527BHB6*L8ARHDJL.Q7*2T7:SCNFZN70H6*AS6+T$D9UCAD97R8NIBO+/RJVE$9PAGPTBIZEP MO-Q0:R13IURRQ5MV93M9V3X2U:NDZSF"
);
const verfificationResult = verifySignature(cert);

if (!verfificationResult.isValid()) {
  console.log(verfificationResult.getMessage())
}

const healthCertificate = parseCoseCertificate(cert)

// Display vaccination information
if (healthCertificate.vaccinations.length > 0) {
  console.log(healthCertificate.vaccinations[0]);
}

```

will display

```json
{
  "target": "COVID-19",
  "vaccineType": "MRNA",
  "medicinalProduct": "EU/1/20/1507",
  "manufacturer": "ORG-100031184",
  "doseNumber": 1,
  "totalDoses": 2,
  "date": "2021-05-29",
  "country": "DE",
  "issuer": "Robert Koch-Institut",
  "id": "URN:UVCI:01DE/IZ12345A/5CWLU12RNOB9RXSEOP6FG8#W"
}
```

## Documentation

Full documentation of the library can be found [here](https://btielen.github.io/covid-certificate/)

## Author

This library is written by Benno Tielen. Contributions are welcome!
