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

  this._start = function(url) {
    self.browser = wd.remote(config, 'promiseChain');
    self.browser.init(spec)
        .get(url)
        .done();

    self._process = {
      kill: function() {
        self.browser.quit(function() {
          log.info('Killed ' + spec.name + '.');
          self._onProcessExit(self.error ? -1 : 0, self.error);
        });
      }
    };
  };

  // We can't really force browser to quit so just avoid warning about SIGKILL
  this._onKillTimeout = function(){};
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
