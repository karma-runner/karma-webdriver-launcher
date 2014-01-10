karma-webdriver-launcher
========================

A plugin for Karma 0.9.3 to launch Remote WebDriver instances

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

    karma.set({

      ...
	  
      customLaunchers: {
        'IE7': {
          base: 'WebDriver',
		  config: webdriverConfig,
		  browserName: 'internet explorer',
		  platform: 'Windows XP',
		  version: '7',
		  name: 'Karma'
	    }
      },	  

      browsers: ['IE7'],

      ...

    });


```

