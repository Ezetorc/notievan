export const JWT_SECRET = process.env.JWT_SECRET || "JWT_SECRET";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";
export const CLOUDINARY = {
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  API_KEY: process.env.CLOUDINARY_API_KEY,
  API_SECRET: process.env.CLOUDINARY_API_SECRET,
};
