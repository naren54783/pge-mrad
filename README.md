Description:

	The Station Processing API is a Node.js and Hapi.js-based application designed to process and manage station data. 
	It provides RESTful endpoints to interact with station information, allowing data processing, transformation, and uploading of station data to AWS S3. 
	You can run this API on your local machine. The API uses AWS services like S3 to store processed data, and the application is designed for easy deployment and testing.

Features: 

	POST /api/stations/process: Process station data and upload it to AWS S3.


Technologies Used:

	Node.js and Hapi.js for server and API development.

	AWS SDK for integration with AWS S3.


Prerequisites:

	Node.js (v18 or higher recommended)

	npm or yarn to manage packages

	AWS Account with lambda, api Gateway and S3 bucket.


Installation:

1. Clone the repository:

   	git clone https://github.com/naren54783/pge-mrad.git
   
   	cd pge-mrad

3. Install dependencies:

  		npm install

3.Configure:
  		AWS configuration - Update your AWS credentials (AWS_REGION, S3_BUCKET_NAME, etc.) in the config/config.js file or set environment variable
    		Also update the API url in config file	

Project Structure:

	pge-mrad/
	├── .aws-sam/           # AWS SAM build artifacts
	├── .vscode/            # VS Code settings (optional)
	├── node_modules/       # Node.js dependencies
	├── output/             # Directory for generated files
	├── src/                # Source code for the application
	├── test/               # Unit and integration tests
	├── .gitignore          # Git ignore file
	├── package-lock.json   # Dependency lock file
	├── package.json        # Project metadata and dependencies
	└── template.yml        # AWS SAM template for deployment


 Usage:

Running the Server on local machine

	To start the Hapi.js server locally:

	npm start

The server will start on http://localhost:3000 by default.


API Enpoints :
	POST /api/stations/process

	Description: Process station data and upload it to S3.
	
	Response: Confirmation message indicating if the upload was successful.

AWS Deployment

Steps for AWS Deployment

1. Package the Application:

  Use the AWS SAM CLI to package the application:

	sam package --template-file template.yml --s3-bucket <your-s3-bucket> --output-template-file packaged.yml

 Replace <your-s3-bucket> with the name of your S3 bucket to store deployment artifacts.

2. Deploy the Application:

  Deploy the packaged application using AWS SAM:

	sam deploy --template-file packaged.yml --stack-name pge-mrad-api --capabilities CAPABILITY_IAM

  This command will deploy the application to AWS and create the necessary resources, including the Lambda functions and API Gateway.

3. Configure Environment Variables:

  Set up the necessary environment variables for your Lambda functions, such as Stage, STATION_API_URL, AWS_REGION and S3_BUCKET_NAME in temaplate.yml file.

4. Accessing the API

 Base URL: After deployment, you will receive an API Gateway endpoint URL.

 Testing the Endpoints: You can use tools like Postman or cURL to test the API endpoints.

 Example using curl to test the /api/stations/process endpoint:

	curl -X POST https://<api-id>.execute-api.<region>.amazonaws.com/Prod/api/stations/process \-H "Content-Type: application/json"

  Response
	{
	"message": "File uploaded successfully - https://<baseurl>.s3.us-west-2.amazonaws.com/stations.csv"
	}



**** Pending Items:

	Add a unit-test for the API call.
 
 	Optimize the app as best as possible for performance and assume your app will run in a multiprocessor or multicore environment.



	    
