karma-webdriver-launcher
========================

A plugin for Karma to launch Remote WebDriver instances.

## Usage

```bash
$ npm install karma-webdriver-launcher
```

In your karma.conf.js file (e.g. using SauceLabs Connect - you need to have a scout tunnel open for this to work!):

```js
module.exports = function(karma) {

  var webdriverConfig = {
    hostname: 'ondemand.saucelabs.com',
    port: 80,
    user: 'USERNAME',
    pwd: 'APIKEY'
  }


  ...

    config.set({

      ...

      customLaunchers: {
        'IE7': {
          base: 'WebDriver',
          config: webdriverConfig,
          browserName: 'internet explorer',
          platform: 'XP',
          version: '10',
          'x-ua-compatible': 'IE=EmulateIE7',
          name: 'Karma',
          pseudoActivityInterval: 30000
        }
      },

      browsers: ['IE7'],

      ...

    });


```

### pseudoActivityInterval
Interval in ms to do some activity to avoid killing session by timeout.

If not set or set to `0` - no activity will be performed.
