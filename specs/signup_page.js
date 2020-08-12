const { percySnapshot } = require('@percy/webdriverio');
const sync = require('@wdio/sync').default
var common = require('./../helper/common');

describe('Spark demo application - Signup page', function() {
  const title = this.title

  it('should load signup page', async function () {
    try {
      await browser.maximizeWindow();
      await browser.url(`${common.constants.URL}:${common.constants.PORT}/signup`);
      await percySnapshot(browser, 'Signup Page', {widths: common.constants.TEST_WIDTHS});
      common.mark_test_status(browser.sessionId, "passed", "", title, 'automate')
    } catch (e) {
      common.mark_test_status(browser.sessionId, "failed", e.message, title, 'automate')
    }

  })

  it('should load signup page - Validations', async function () {
    try {
      await browser.maximizeWindow();
      var element = await $('#signup-email')
      await element.setValue("test@percy.io")
      await browser.execute(() => { $('#signup-submit').click() });
      await percySnapshot(browser, 'Signup Page Validation', {widths: common.constants.TEST_WIDTHS});
      common.mark_test_status(browser.sessionId, "passed", "", title, 'automate')
    } catch (e) {
        common.mark_test_status(browser.sessionId, "failed", e.message, title, 'automate')
    }
  })

})
