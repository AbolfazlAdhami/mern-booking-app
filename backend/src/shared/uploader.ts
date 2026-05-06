import multer from "multer";
import cloudinary from "cloudinary";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

async function uploadImages(imagesFiles: Express.Multer.File[]) {
  const uploadPromises = imagesFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${b64}`;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imagesUrls = await Promise.all(uploadPromises);
  return imagesUrls;
}

export { upload, uploadImages };
