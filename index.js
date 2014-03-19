var fs = require('fs');
var wd = require('wd');

var WebDriverInstance = function (baseBrowserDecorator, args) {
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
      console.log('Killed ' + spec.name + '.');
      callback();
    });
  });

  this._start = function (url) {
    self.browser = wd.remote(config);
    self.browser.init(spec, function () {
      self.browser.get(url);
    });
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

WebDriverInstance.$inject = ['baseBrowserDecorator', 'args'];

// PUBLISH DI MODULE
module.exports = {
  'launcher:WebDriver': ['type', WebDriverInstance]
};
