var wd = require('wd');

var WebDriverInstance = function (baseBrowserDecorator, args) {
  var config = args.config || {
    hostname: '127.0.0.1',
    port: 4444
  };
  var self = this;

  // Intialize with default values
  var spec = {
    platform: 'ANY',
    testName: 'Karma test',
    tags: [],
    version: ''
  };

  Object.keys(args).forEach(function (key) {
    var value = args[key];
    switch (key) {
    case 'browserName':
      break;
    case 'platform':
      break;
    case 'testName':
      break;
    case 'tags':
      break;
    case 'version':
      break;
    case 'config':
      // ignore
      return;
    }
    spec[key] = value;
  });

  if (!spec.browserName) {
    throw new Error('browserName is required!');
  }

  baseBrowserDecorator(this);

  this.name = spec.browserName + ' via Remote WebDriver';

  this.on('kill', function(callback) {
    self.browser.quit(function() {
      console.log('Killed ' + spec.testName + '.');
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
