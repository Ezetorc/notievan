import { v2 as cloudinary } from "cloudinary";
import { privateEnv } from "./private-env.configuration";

cloudinary.config({
  cloud_name: privateEnv.cloudinary.cloudName,
  api_key: privateEnv.cloudinary.apiKey,
  api_secret: privateEnv.cloudinary.apiSecret,
});

export default cloudinary;
