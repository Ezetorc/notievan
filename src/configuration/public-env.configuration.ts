export const BASE_URL =
  import.meta.env.PUBLIC_API_URL || "http://localhost:4321";
console.log(".env: ", import.meta.env.PUBLIC_API_URL);
console.log("BASE_URL = ", BASE_URL);
