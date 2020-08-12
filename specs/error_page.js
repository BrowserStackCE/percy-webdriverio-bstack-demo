const { percySnapshot } = require('@percy/webdriverio');
const sync = require('@wdio/sync').default
var common = require('./../helper/common');

describe('Spark demo application - Error pages', function() {
  const title = this.title
  it('should load 404 error page', async function () {
    try {
      await browser.maximizeWindow();
      await browser.url(`${common.constants.URL}:${common.constants.PORT}/404_error`);
      await percySnapshot(browser, '404 Page', {widths: common.constants.TEST_WIDTHS});
      common.mark_test_status(browser.sessionId, "passed", "", title, 'automate')
    } catch (e) {
      common.mark_test_status(browser.sessionId, "failed", e.message, title, 'automate')
    }

  })

  it('should load 500 error page', async function () {
      try {
        await browser.maximizeWindow();
        await browser.url(`${common.constants.URL}:${common.constants.PORT}/500_error`);
        await percySnapshot(browser, '500 Page', {widths: common.constants.TEST_WIDTHS});
        common.mark_test_status(browser.sessionId, "passed", "", title, 'automate')
      } catch (e) {
        common.mark_test_status(browser.sessionId, "failed", e.message, title, 'automate')
      }
    })
})
