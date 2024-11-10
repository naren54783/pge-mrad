const Hapi = require('@hapi/hapi');
const routes = require('./routes/route');
const config = require('./config/config');
class App {
  constructor() {
    this.server = Hapi.server({
      host: config.HOST ,
      port: config.PORT,
    });
  }

  async loadSettingsAndStartServer() {
    await this.routes();
    await this.start();
  }

  async routes() {
    await this.server.route(routes);
  }

  async start() {
    await this.server.start();
    console.log(`Server running on ${this.server.info.uri}`);
  }
}

module.exports = App;
