module.exports = {
    STATION_API_URL: process.env.STATION_API_URL || 'https://gbfs.divvybikes.com/gbfs/en/station_information.json',
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 3000,
    AWS_REGION: process.env.AWS_REGION || 'us-west-2',
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || 'pge-mrad-challenge',
    
   };
  