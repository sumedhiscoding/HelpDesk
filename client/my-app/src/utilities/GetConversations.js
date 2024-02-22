import axios from "axios";
import { config } from "dotenv";

config();

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

export const GetConversationsFromMessenger = async (payload) => {
  const params = {
    PageAccessToken:
      "EAAFOSMP8bxYBOZBdT0fJ6XwCnWlTc9PdxagPSa8Pc8qztVfS1GzAUOWVJAZAmqw1qxEMkEcUy6y2L9CZCGjDppbRZA8AvpQAOufFGXYpfHPNauTf1JPhic9Pam70VZAEgincZCElpMTY4lbh2UN5lSNDfc9LUejxZChuMuXqcnf0VRLKOyhuGRxeBwTFrl3vbDi",
    PageId: "238945609301859",
  };
//   console.log("inside GetConversations", payload);
//   console.log("inside GetConversations", BACKEND_URL);
  try {
    const response = await axios.post(`${BACKEND_URL}/getconversations`, params);
    // console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
    const error = e.message;
    return error;
  }
};

export const getConversationsfromDb = async (payload) => {
  const params = {
    userId1: payload.userId1,
    userId2: payload.userId2,
  };
  try {
    const response = await axios.post(`${BACKEND_URL}/getconversations`, {
      params: params,
    });
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
    return e.message;
  }
};

