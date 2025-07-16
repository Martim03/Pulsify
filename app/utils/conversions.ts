import { encode as base64Encode } from "base-64";

export function base64URLEncode(str: Uint8Array | string): string {
  if (typeof str !== "string") {
    str = String.fromCharCode(...str);
  }
  return base64Encode(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
