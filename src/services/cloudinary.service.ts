import cloudinary from "../configuration/cloudinary.configuration";

export class CloudinaryService {
  static async upload(file: File, folder = "articles") {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });
  }
}
