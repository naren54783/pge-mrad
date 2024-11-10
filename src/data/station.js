const axios = require('axios');
const config = require('../config/config');
async function getStations() {
  try {
    const response = await axios.get(config.STATION_API_URL);
    console.log('Data:', JSON.stringify(response.data));
    return response?.data?.data?.stations;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

module.exports = {
  getStations
};
