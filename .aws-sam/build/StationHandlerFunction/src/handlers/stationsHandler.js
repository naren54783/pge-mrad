const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const { stringify } = require("flatted");
const json2csv = require("json2csv").parse;
const { uploadToS3 } = require("../s3/helper");
const { getStations } = require("../data/station");
const { createResponse } = require("../response/response");

exports.handler = async (event) => {
  console.log("Event received:", stringify(event, null, 2));

  try {
    const fileData = await getAndTransformData();
    if (!fileData?.length) {
      return createResponse(404, "No data found!");
    }

    const response = await createFileAndUpload(fileData);
    return createResponse(200, `${response?.message} - ${response?.location}`);
  } catch (error) {
    console.error("Error in handler:", error.message);
    return createResponse(500, `Error: ${error.message}`);
  }
};

/**
 * Fetch and transform station data
 * @returns {Array|null} Filtered and transformed station data
 */
async function getAndTransformData() {
  try {
    console.log("Fetching and transforming station data...");
    const stations = await getStations();

    if (!stations?.length) {
      return null;
    }

    return stations
      .filter(({ capacity }) => capacity < 12)
      .map(({ rental_methods, rental_uris, external_id: externalId, station_id: stationId, legacy_id: legacyId, ...rest }) => ({
        externalId,
        stationId,
        legacyId,
        ...rest,
      }));
  } catch (error) {
    console.error("Error fetching station data:", error.message);
    throw error;
  }
}

/**
 * Create a CSV file from data and upload to S3
 * @param {Array} data Data to write to CSV
 * @returns {string} Result message indicating S3 location
 */
async function createFileAndUpload(data) {
  const csvData = json2csv(data);
  const filePath = getFilePath();

  try {
    if (!isRunningInLambda()) {
      await fs.ensureDir(path.dirname(filePath));
    }

    // Write CSV to a local file and upload to S3
    await fs.writeFile(filePath, csvData);
    const response = await uploadToS3("stations.csv", csvData, "text/csv");

    console.log("File created and uploaded successfully to S3.");
    return response;
  } catch (error) {
    console.error("Error creating or uploading file:", error.message);
    throw error;
  }
}

/**
 * Get the file path based on the environment
 * @returns {string} File path
 */
const getFilePath = () => (
  isRunningInLambda()
    ? path.join("/tmp", "output.csv")
    : path.join(__dirname, "output", "output.csv")
);

/**
 * Check if the code is running in AWS Lambda
 * @returns {boolean} True if running in Lambda
 */
const isRunningInLambda = () => !!process.env.AWS_LAMBDA_FUNCTION_NAME;
