const { percySnapshot } = require('@percy/webdriverio');
const sync = require('@wdio/sync').default
var common = require('./../helper/common');

describe('Spark demo application - Login page', function() {
  const title = this.title
  it('should load login page', async function () {
      try {
      await browser.maximizeWindow();
      await browser.url(`${common.constants.URL}:${common.constants.PORT}/login`);
      await percySnapshot(browser, 'Login Page', {widths: common.constants.TEST_WIDTHS});
      common.mark_test_status(browser.sessionId, "passed", "", title, 'automate')
    } catch (e) {
        common.mark_test_status(browser.sessionId, "failed", e.message, title, 'automate')
    }
  })

  it('should load login page - Validations', async function () {
    try {
      await browser.maximizeWindow();
      var element = await $('#login-email')
      await element.setValue("test-login@percy.io")
      await browser.execute(() => { $('#login-submit').click() });
      await percySnapshot(browser, 'Login Page Validation', {widths: common.constants.TEST_WIDTHS});
      common.mark_test_status(browser.sessionId, "passed", "", title, 'automate')
    } catch (e) {
        common.mark_test_status(browser.sessionId, "failed", e.message, title, 'automate')
    }
  })

})
