import crypto from "crypto";

export function generateBinanceHeaders(payload: string) {
  const apiKey = process.env.BINANCE_API_KEY!;
  const secretKey = process.env.BINANCE_SECRET_KEY!;
  const timestamp = Date.now().toString();
  const nonce = crypto.randomBytes(16).toString("hex");

  // Estructura de firma oficial de Binance Pay V2
  const signaturePayload = `${timestamp}\n${nonce}\n${payload}\n`;
  const signature = crypto.createHmac("sha512", secretKey).update(signaturePayload).digest("hex").toUpperCase();

  return {
    "Content-Type": "application/json",
    "BinancePay-Timestamp": timestamp,
    "BinancePay-Nonce": nonce,
    "BinancePay-Certificate-SN": apiKey,
    "BinancePay-Signature": signature,
  };
}
