var fs = require('fs');
var wd = require('wd');

var WebDriverInstance = function (baseBrowserDecorator, args, logger) {
  var log = logger.create('WebDriver');

  var config = args.config || {
    hostname: '127.0.0.1',
    port: 4444
  };
  var spec = {
    browserName: args.browserName,
    version: args.version || '',
    platform: args.platform || 'ANY',
    tags: args.tags || [],
    name: args.testName || 'Karma test'
  };
  var self = this;

  baseBrowserDecorator(this);

  this.name = spec.browserName + ' via Remote WebDriver';

  this.on('kill', function(callback) {
    self.browser.quit(function() {
      log.info('Killed ' + spec.name + '.');

      if (self.error === 'timeout') {
          // This will trigger the
          // launcher retry mechanism
          self.emit('done');
      }

      callback();
    });
  });

  this._start = function (url) {
    self.browser = wd.remote(config, 'promiseChain');

    self.browser.init(spec)
        .get(url)
        .done();
  };
};

WebDriverInstance.prototype = {
  name: 'WebDriver',

  DEFAULT_CMD: {
    linux: require('wd').path,
    darwin: require('wd').path,
    win32: require('wd').path
  },
  ENV_CMD: 'WEBDRIVER_BIN'
};

WebDriverInstance.$inject = ['baseBrowserDecorator', 'args', 'logger'];

// PUBLISH DI MODULE
module.exports = {
  'launcher:WebDriver': ['type', WebDriverInstance]
};
