Description:

The Station Processing API is a Hapi.js-based application designed to process and manage station data. 
It provides RESTful endpoints to interact with station information, allowing data processing, transformation, and uploading of station data to AWS S3. 
The API uses AWS services like S3 to store processed data, and the application is designed for easy deployment and testing.

Features: 

POST /api/stations/process: Process station data and upload it to AWS S3.


Technologies Used:

Node.js and Hapi.js for server and API development.

AWS SDK for integration with AWS S3.


Prerequisites:

Node.js (v18 or higher recommended)

npm or yarn to manage packages

AWS Account with S3 bucket for file storage


Installation:

1. Clone the repository:

   git clone https://github.com/naren54783/pge-mrad.git
   
   cd pge-mrad

3. Install dependencies:

  npm install

3.Configure AWS Credentials:
  Update your AWS credentials (AWS_REGION, S3_BUCKET_NAME, etc.) in the config/config.js file or set environment variable
