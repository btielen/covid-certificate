// https://github.com/irony/base45/blob/main/lib/base45.js

import { Buffer } from "buffer";

const CHARSET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";
const divmod = (x: number, y: number) => [Math.floor(x / y), x % y];

/**
 * Decode a base45 encoded string
 *
 * @param input
 */
export const decode = (input: string): Buffer => {
  const buffer = Array.from(input).map((c) => CHARSET.indexOf(c));
  const res = [];
  for (let i = 0; i < buffer.length; i = i + 3) {
    if (buffer.length - i >= 3) {
      const x = buffer[i] + buffer[i + 1] * 45 + buffer[i + 2] * 45 * 45;
      if (x > 0xffff) {
        throw new Error("Invalid base45 string");
      }
      res.push(...divmod(x, 256));
    } else {
      const x = buffer[i] + buffer[i + 1] * 45;
      if (x > 0xff) {
        throw new Error("Invalid base45 string");
      }
      res.push(x);
    }
  }
  return Buffer.from(res);
};
