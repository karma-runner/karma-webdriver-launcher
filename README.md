karma-webdriver-launcher
========================

A plugin for Karma 0.9.2 to launch WebDriver instances

Uses a forked copy of [Karma] with [CustomLauncherPullRequest] applied. Hopefully this will change once the Pull Request
is applied ;)

## Usage

```bash
$ npm install -g git://github.com/hindsightsoftware/karma.git#webdriver
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
