const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

// Multer Filter (Allow Only Images)
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true); // Accept image files
  } else {
    cb(new Error("Unsupported file format! Only images are allowed."), false);
  }
};

// Cloudinary Storage with Unique Filenames
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "uploads",
      format: async () => "jpg",
      public_id: (req, file) => `${Date.now()}-${file.originalname.split(".")[0]}`,
    },
  });
  

// Multer Middleware
const uploadPhoto = multer({
  storage,
  fileFilter: multerFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
});

// const cloudinaryUploadImg = async (fileToUpload) => {
//     console.log("test3");
// console.log(fileToUpload);
//     return new Promise((resolve, reject) => {
//         console.log("Debug: Starting Cloudinary upload...");
//         console.log("File to upload:", fileToUpload);
      
//         cloudinary.uploader.upload(
//           fileToUpload,
//           { resource_type: "auto", use_filename: true, unique_filename: true },
//           (error, result) => {
//             if (error) {
//               console.error("Error uploading to Cloudinary:", error);
//               return reject({ error: "Failed to upload image to Cloudinary", details: error });
//             }
      
//             console.log("Upload successful:", result);
//             resolve({
//               url: result.secure_url,
//               asset_id: result.asset_id,
//               public_id: result.public_id,
//             });
//           }
//         );
//       });
      
//   };
  
  // Delete Function
  const cloudinaryDeleteImg = async (publicId) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          console.error("Error deleting from Cloudinary:", error);
          return reject(error);
        }
        resolve(result);
      });
    });
  };

// Export Middleware
module.exports = {
  uploadPhoto, cloudinaryDeleteImg
};
