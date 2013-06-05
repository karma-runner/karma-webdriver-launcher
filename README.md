karma-webdriver-launcher
========================

A plugin for Karma 0.9.2 to launch WebDriver instances

## Usage

This is to build and use with our forked copy of [Karma] which has [CustomLauncherPullRequest] applied.
Requires grunt-cli to be installed

```bash
$ git clone git://github.com/hindsightsoftware/karma.git -b webdriver && cd karma
$ npm install
$ grunt build
$ npm install -g
$ npm install -g git://github.com/hindsightsoftware/karma-webdriver-launcher.git
```

Then in your karma.conf.js file (e.g. using SauceLabs Connect - you need to have a scout tunnel open for this to work!):

```js
module.exports = function(karma) {

  var webdriverConfig = {
    url: 'ondemand.saucelabs.com',
    port: 80,
    user: 'username',
    key: 'saucelabs-api-key'
  }

  karma.defineLauncher('IE7', 'WebDriver', {
    config: webdriverConfig,
    spec: {
      browserName: 'internet explorer',
      version: '7',
      platform: 'Windows XP',
      tags: ['IE7', 'Windows XP'],
      name: 'IE7:Windows XP'
    }
  });

  ...

    karma.configure({

      ...

      browsers: ['IE7'],

      ...

    });


```

and then use Karma as normal :)

[Karma]: https://github.com/karma-runner/karma
[CustomLauncherPullRequest]: https://github.com/karma-runner/karma/pull/533
