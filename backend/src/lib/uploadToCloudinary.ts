import cloudinary from "../config/cloudinary";

export const uploadToCloudinary = (fileBuffer: Buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "angular-ecomerece",
      },
      (error, uploadResult) => {
        if (error) {
          return reject(error);
        }
        resolve(uploadResult);
      },
    );
    uploadStream.end(fileBuffer);
  });
};
