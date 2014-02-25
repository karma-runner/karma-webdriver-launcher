var fs = require('fs');
var wd = require('wd');

var WebDriverInstance = function (baseBrowserDecorator, args) {
  var config = args.config || {
    hostname: '127.0.0.1',
    port: 4444
  };
  var self = this;
  var spec = {};

  Object.keys(args).forEach(function (key) {
    var value = args[key];
    switch (key) {
    case 'browserName':
      if (!value) throw new Error('browserName is required!');
      break;
    case 'platform':
      if (!value) value = 'ANY';
      break;
    case 'name':
      if (!value) value = 'Karma test';
      break;
    case 'tags':
      if (!value) value = [];
      break;
    case 'version':
      if (!value) value = '';
      break;
    case 'config':
      // ignore
      return;
    }
    spec[key] = value;
  });

  baseBrowserDecorator(this);

  this.name = spec.browserName + ' via Remote WebDriver';


  this.kill = function(callback) {
    self.browser.quit(function() {
      console.log('Killed ' + spec.name + '.');
      callback();
    });
  }

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
