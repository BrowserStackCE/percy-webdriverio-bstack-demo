const { percySnapshot } = require('@percy/webdriverio');
const sync = require('@wdio/sync').default
var common = require('./../helper/common');


describe('Spark demo application - Dashboard page', function() {
  const title = this.title
  browser.maximizeWindow();
  it('should load dashboard page', async function () {
    try {
      await browser.url(`${common.constants.URL}:${common.constants.PORT}/`);
      await percySnapshot(browser, 'Index Page', {widths: common.constants.TEST_WIDTHS});
      common.mark_test_status(browser.sessionId, "passed", "", title, 'automate')
    } catch (e) {
      common.mark_test_status(browser.sessionId, "failed", e.message, title, 'automate')
    }

  })

  it('should load dashboard page - Index Menu closed', async function () {
    try {
      await browser.execute(() => { $('#menu-toggle').click() });
      await percySnapshot(browser, 'Index Page Menu Closed', {widths: common.constants.TEST_WIDTHS});
      // reset menu
      await browser.execute(() => { $('#menu-toggle').click() });
      common.mark_test_status(browser.sessionId, "passed", "", title, 'automate')
    } catch (e) {
      common.mark_test_status(browser.sessionId, "failed", e.message, title, 'automate')
    }

  })

  it('should load dashboard page - Index Top row closed', async function () {
    try {
      await browser.execute(() => { $('#messages-toggle').click() });
      await browser.execute(() => { $('#todo-toggle').click() });
      await browser.execute(() => {$('#calendar-toggle').click() });
      await percySnapshot(browser, 'Index Top Row Collapsed', {widths: common.constants.TEST_WIDTHS});

      // reset page
      await browser.execute(() => { $('#messages-toggle').click() });
      await browser.execute(() => { $('#todo-toggle').click() });
      await browser.execute(() => { $('#calendar-toggle').click() });
      common.mark_test_status(browser.sessionId, "passed", "", title, 'automate')
    } catch (e) {
      common.mark_test_status(browser.sessionId, "failed", e.message, title, 'automate')
    }

  })

  it('should load dashboard page - Profile menu', async function () {
    try {
      element = await $('#nav-profile-menu')
      element.click();

      await percySnapshot(browser, 'Profile Menu', {widths: common.constants.TEST_WIDTHS});

      // reset Page
      element = await $('#nav-profile-menu')
      element.click();
      common.mark_test_status(browser.sessionId, "passed", "", title, 'automate')
    } catch (e) {
      common.mark_test_status(browser.sessionId, "failed", e.message, title, 'automate')
    }

  })

  it('should load dashboard page - Messages menu', async function () {
    try {
      element = await $('#nav-messages-menu')
      element.click();

      await percySnapshot(browser, 'Messages Menu', {widths: common.constants.TEST_WIDTHS});

      // reset page
      element = await $('#nav-messages-menu')
      element.click();
      common.mark_test_status(browser.sessionId, "passed", "", title, 'automate')
    } catch (e) {
      common.mark_test_status(browser.sessionId, "failed", e.message, title, 'automate')
    }
  })

  it('should load dashboard page - Tasks menu', async function () {
    try {
      element = await $('#nav-tasks-menu')
      element.click();

      await percySnapshot(browser, 'Tasks Menu', {widths: common.constants.TEST_WIDTHS});
      common.mark_test_status(browser.sessionId, "passed", "", title, 'automate')
    } catch (e) {
      common.mark_test_status(browser.sessionId, "failed", e.message, title, 'automate')
    }
  })

})
