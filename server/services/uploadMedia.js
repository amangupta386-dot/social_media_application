import Feed from '../models/feed';

const multer = require('multer');
const Minio = require('minio');
const upload = multer({ storage }).single('file');
const { v4: uuidv4 } = require('uuid');
const BUCKET_NAME = process.env.MINIO_BUCKET;


const minioClient = new Minio.Client({
    endpoint: process.env.MINIO_HOST, // Replace with your MinIO URL
    port:process.env.MINIO_PORT,
    accessKey: process.env.MINIO_ACCESS_KEY,
    useSSL: true,
    secretKey: process.env.MINIO_SECRET_KEY,
});


module.exports = minioClient;

export const uploadFile = async (req, res) => {
    try {
      // Upload file using multer
      upload(req, res, async (err) => {
        if (err || !req.file) {
          return res.status(400).json({ message: 'No file uploaded or upload failed' });
        }
  
        const fileName = `${uuidv4()}_${req.file.originalname}`; // Generate unique file name
        const metaData = {
          'Content-Type': req.file.mimetype,
        };
  
        // Define folder structure based on assessmentId, candidateId, or other criteria
        const folderName = `MyFiles/`;
        const filePath = `${folderName}/${fileName}`; // Path where the file will be uploaded
  
        // Upload the file to the MinIO bucket within the specified folder
        minioClient.putObject(
          BUCKET_NAME,
          filePath, // Upload to folder
          req.file.buffer,
          metaData,
          (err, etag) => {
            if (err) {
              console.error('Error uploading to MinIO:', err);
              return res.status(500).json({ message: 'Upload to MinIO failed', error: err });
            }
  
            const fileUrl = `https://${MINIO_BASE_URL}/${BUCKET_NAME}/${filePath}`; // Updated URL with folder structure
  
            // Optionally save video metadata to MongoDB with additional fields
            const newPost = Feed({
              title: req.body.title,
              fileName: fileName,
              fileUrl: fileUrl,
              user: req.body.userId
            });
  
            newPost
              .save()
              .then(() => res.status(200).json({ message: 'File uploaded successfully', videoUrl: fileUrl }))
              .catch((error) => {
                console.error('Error saving video to MongoDB:', error);
                res.status(500).json({ message: 'Failed to save video metadata', error });
              });
          }
        );
      });
    } catch (error) {
      console.error('Error in uploadVideo:', error);
      return res.status(500).json({ message: 'Server error', error });
    }
  };


