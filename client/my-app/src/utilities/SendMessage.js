import React from "react";
import axios from "axios";
import { config } from "dotenv";

config();

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";


export const SendMessage = async (payload) => {
//   const params = {
//     PageAccessToken:
//       "EAAFOSMP8bxYBOZBdT0fJ6XwCnWlTc9PdxagPSa8Pc8qztVfS1GzAUOWVJAZAmqw1qxEMkEcUy6y2L9CZCGjDppbRZA8AvpQAOufFGXYpfHPNauTf1JPhic9Pam70VZAEgincZCElpMTY4lbh2UN5lSNDfc9LUejxZChuMuXqcnf0VRLKOyhuGRxeBwTFrl3vbDi",
//     PageId: "238945609301859",
//     message: payload.message,
//     PageScopedId: payload.PageScopedId,
//   };
//   console.log("params for send message",params);
  try {
    console.log("payload",payload)
    const response = await axios.post(`${BACKEND_URL}/send-message`, {
        PageAccessToken:
          "EAAFOSMP8bxYBOZBdT0fJ6XwCnWlTc9PdxagPSa8Pc8qztVfS1GzAUOWVJAZAmqw1qxEMkEcUy6y2L9CZCGjDppbRZA8AvpQAOufFGXYpfHPNauTf1JPhic9Pam70VZAEgincZCElpMTY4lbh2UN5lSNDfc9LUejxZChuMuXqcnf0VRLKOyhuGRxeBwTFrl3vbDi",
        PageId: "238945609301859",
        message: payload.message,
        PageScopedId: payload.PageScopedId,
      });
    console.log("message sent successfully",response);
    return response.data;
  } catch (e) {
    console.log("message failed to send",e);
    const error = e.message;
    return error;
  }
};
