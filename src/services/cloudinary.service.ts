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

  static async delete(publicId: string) {
    return new Promise<any>((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  }

  static extractIdOf(url: string) {
    const cloudinaryRegex = /https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/(?:v\d+\/)?(.+)\.(jpg|jpeg|png|gif|webp)$/;
    const match = url.match(cloudinaryRegex);

    if (match && match[1]) {
      return decodeURIComponent(match[1]);
    }
    return null;
  }
}
