import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY } from "./backend-env.configuration";

cloudinary.config({
  cloud_name: CLOUDINARY.CLOUD_NAME,
  api_key: CLOUDINARY.API_KEY,
  api_secret: CLOUDINARY.API_SECRET,
});

export default cloudinary;
