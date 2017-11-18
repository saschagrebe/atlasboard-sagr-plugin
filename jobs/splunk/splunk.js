/**
 * Job: splunk
 *
 * Expected configuration:
 * { 
 *   splunk-search : {
 *       widgetTitle : 'Error Count',
 *       serverUrl : 'localhost',
 *       username : 'admin',
 *       password : 'password',
 *       scheme: "https",
 *       host: "localhost",
 *       port: "8089",
 *       version: "5.0"
 *       searchQuery : "search * | head 10",
 *       searchParams : {
 *         earliest_time: "2011-06-19T12:00:00.000-07:00",
 *         latest_time: "2012-12-02T12:00:00.000-07:00"
 *       }
 *    }
 * }
 */
var splunkjs = require('splunk-sdk');
var splunkServer = null;

module.exports = {

  /**
   * Executed on job initialisation (only once)
   * @param config
   * @param dependencies
   */
  onInit: function (config, dependencies) {
      var logger = dependencies.logger;

      splunkServer = new splunkjs.Service({
          username: config.username,
          password: config.password,
          scheme: config.scheme,
          host: config.host,
          port: config.port,
          version: config.version
      });
      splunkServer.login(function(err, success) {
          if (err) {
              logger.info("Could not login to splunk: " + err);
          } else {
              logger.info("Login to splunk successful");
          }
      });
  },

  /**
   * Executed every interval
   * @param config
   * @param dependencies
   * @param jobCallback
   */
  onRun: function (config, dependencies, jobCallback) {
    var logger = dependencies.logger;

    splunkServer.oneshotSearch(
        config.searchQuery,
        config.searchParams,
        function(err, results) {
            if (err) {
              logger.error(err + ", " + err.data.messages);
              jobCallback("Could not query splunk.");

            } else {
              jobCallback(null, {title: config.widgetTitle, results: results});

            }
        }
    );
  }
};