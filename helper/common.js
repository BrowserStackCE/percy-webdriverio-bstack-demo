var rp = require('request-promise');

function mark_test_status(sessionId, status, reason, name, product) {

  return new Promise(function (resolve, reject) {

    var options = {
      method: 'PUT',
      uri: 'https://' + process.env.BROWSERSTACK_USERNAME + ':' + process.env.BROWSERSTACK_ACCESS_KEY + '@api.browserstack.com/' + product + '/sessions/' + sessionId + '.json',
      headers: {
        'content-type': 'application/json'
      },
      form: {
        status: status,
        reason: reason,
        name: name
      }
    };

    rp(options, function (body, error) {
      resolve();
    })
  });
}


module.exports.mark_test_status = mark_test_status;
module.exports.constants = Object.freeze({
  PORT: '8000',
  TEST_WIDTHS: [375, 768, 1280],
  URL: 'http://localhost'
});
