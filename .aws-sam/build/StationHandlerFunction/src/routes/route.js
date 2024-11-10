const stationsHandler = require('../handlers/stationsHandler');
module.exports = [
 {
    method: 'POST',
    path: '/api/stations/process',
    handler: stationsHandler.handler,
    options: {
      auth: false
    }
  }]