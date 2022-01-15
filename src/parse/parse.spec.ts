import { parse } from "./parse";

describe("Health certificate", () => {
  test("German vaccinated", () => {
    const hcert = parse(
      "HC1:6BF+70790T9WJWG.FKY*4GO0.O1CV2 O5 N2FBBRW1*70HS8WY04AC*WIFN0AHCD8KD97TK0F90KECTHGWJC0FDC:5AIA%G7X+AQB9746HS80:54IBQF60R6$A80X6S1BTYACG6M+9XG8KIAWNA91AY%67092L4WJCT3EHS8XJC +DXJCCWENF6OF63W5NW6WF6%JC QE/IAYJC5LEW34U3ET7DXC9 QE-ED8%E.JCBECB1A-:8$96646AL60A60S6Q$D.UDRYA 96NF6L/5QW6307KQEPD09WEQDD+Q6TW6FA7C466KCN9E%961A6DL6FA7D46JPCT3E5JDLA7$Q6E464W5TG6..DX%DZJC6/DTZ9 QE5$CB$DA/D JC1/D3Z8WED1ECW.CCWE.Y92OAGY8MY9L+9MPCG/D5 C5IA5N9$PC5$CUZCY$5Y$527BHB6*L8ARHDJL.Q7*2T7:SCNFZN70H6*AS6+T$D9UCAD97R8NIBO+/RJVE$9PAGPTBIZEP MO-Q0:R13IURRQ5MV93M9V3X2U:NDZSF"
    );

    expect(hcert).toEqual({
      alg: "ECDSA-256",
      expirationDate: new Date("2022-01-28T07:47:53.000Z"),
      issuedAt: new Date("2021-05-29T19:21:13.000Z"),
      dateOfBirth: "1964-08-12",
      name: {
        surname: "MUSTERMANN",
        givenName: "ERIKA",
      },
      issuer: "DE",
      kid: "DEsVUSvpFAE=",
      recovered: [],
      tests: [],
      vaccinations: [
        {
          target: "COVID-19",
          vaccineType: "MRNA",
          medicinalProduct: "EU/1/20/1507",
          manufacturer: "ORG-100031184",
          doseNumber: 1,
          totalDoses: 2,
          date: new Date("2021-05-29"),
          country: "DE",
          issuer: "Robert Koch-Institut",
          id: "URN:UVCI:01DE/IZ12345A/5CWLU12RNOB9RXSEOP6FG8#W",
        },
      ],
      version: "1.0.0",
    });
  });

  test("German recovered", () => {
    const cert =
      "HC1:6BFOXN*TS0BI$ZD-PHQ7I9AD66V5B22CH9M9ESI9XBHXK-%69LQOGI.*V76GCV4*XUA2P-FHT-HNTI4L6N$Q%UG/YL WO*Z7ON15 BM0VM.JQ$F4W17PG4.VAS5EG4V*BRL0K-RDY5RWOOH6PO9:TUQJAJG9-*NIRICVELZUZM9EN9-O9:PICIG805CZKHKB-43.E3KD3OAJ6*K6ZCY73JC3KD3ZQTWD3E.KLC8M3LP-89B9K+KB2KK3M*EDZI9$JAQJKKIJX2MM+GWHKSKE MCAOI8%MCU5VTQDPIMQK9*O7%NC.UTWA6QK.-T3-SY$NCU5CIQ 52744E09TBOC.UKMI$8R+1A7CPFRMLNKNM8JI0JPGN:0K7OOBRLY667SYHJL9B7VPO:SWLH1/S4KQQK0$5REQT5RN1FR%SHPLRKWJO8LQ84EBC$-P4A0V1BBR5XWB3OCGEK:$8HHOLQOZUJ*30Q8CD1";

    expect(parse(cert)).toMatchObject({
      alg: "ECDSA-256",
      dateOfBirth: "1964-08-12",
      expirationDate: new Date(1643356073 * 1000),
      issuedAt: new Date(1622316073 * 1000),
      issuer: "DE",
      kid: "DEsVUSvpFAE=",
      name: { givenName: "ERIKA", surname: "MUSTERMANN" },
      recovered: [
        {
          countryOfTest: "DE",
          dateValidFrom: new Date("2021-05-29"),
          dateValidUntil: new Date("2021-06-15"),
          firstDetectedDate: new Date("2021-01-10"),
          id: "URN:UVCI:01DE/5CWLU12RNOB9RXSEOP6FG8#W",
          issuer: "Robert Koch-Institut",
          target: "COVID-19",
        },
      ],
      tests: [],
      vaccinations: [],
      version: "1.0.0",
    });
  });
});
