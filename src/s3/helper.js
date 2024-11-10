const { S3 } = require("aws-sdk");
const config = require('../config/config');

// Lazy initialize AWS S3 instance with region configuration
const s3 = new S3({ region: config.AWS_REGION });

/**
 * Uploads a file to AWS S3
 * @param {string} key - The S3 key for the file (including path and file name)
 * @param {Buffer|string} body - The content of the file
 * @param {string} contentType - The MIME type of the file
 * @returns {Promise<object>} - The result of the S3 upload operation
 */
async function uploadToS3(key, body, contentType) {
  const params = {
    Bucket: config.S3_BUCKET_NAME,
    Key: key,
    Body: body,
    ContentType: contentType,
  };

  try {
    const result = await s3.upload(params).promise();
    return {
      status: true,
      message: 'File uploaded successfully',
      location: result.Location,
    };
  } catch (error) {
    console.error("Error uploading file to S3:", error.message);
    return {
      status: false,
      message: 'File upload failed',
      error: error.message,
    };
  }
}

module.exports = {
  uploadToS3
};
