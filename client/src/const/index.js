export const ENDPOINT =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:4000";
export const BASE_URL = `${ENDPOINT}/api`;
