import jwt from "jsonwebtoken";
import crypto from "crypto";

export function secureToken(productId, index) {
  const raw = crypto.randomBytes(32).toString("hex");

  const jwtToken = jwt.sign({ raw, productId, index }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  return { raw, jwtToken };
}


