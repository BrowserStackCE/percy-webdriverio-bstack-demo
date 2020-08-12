var browserstack = require('browserstack-local');
const httpServer = require('http-server')
var common = require('./helper/common');

exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACC_KEY',
  updateJob: false,
  specs: [
    './specs/*.js'
  ],
  exclude: [],

  capabilities: [{
    browser: 'Chrome',
    os: 'Windows',
    os_version: '10',
    project: 'Percy WebDriverIO BrowserStack Demo',
    name: 'percy_test',
    build: 'percy-webdriverio-bstack-demo: ' + process.env.BUILD_TIMESTAMP,
    'browserstack.local': true,
    'browserstack.localIdentifier': 'test1'
  }],

  logLevel: 'error',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  host: 'hub.browserstack.com',

  before: function () {

  },
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000
  },
  // Code to start browserstack local before start of test
  onPrepare: function (config, capabilities) {
    console.log("Connecting local and starting server");
    return new Promise(function (resolve, reject) {
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({ 'key': exports.config.key, 'localIdentifier': 'test1' }, function (error) {
        if (error) return reject(error);

        console.log('Connected. Now testing...');

        // Start local server to host app under test.
        server = httpServer.createServer({ root: `${__dirname}/assets` })
        server.listen(common.constants.PORT)
        resolve();
      });
    });

  },

  // Code to stop browserstack local after end of test
  onComplete: function (exitCode, config, capabilities, results) {
    // Shut down the HTTP server.
    server.close()
    exports.bs_local.stop();
  }
}
