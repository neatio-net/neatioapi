const request = require("xhr-request-promise");

const genPayload = (() => {
  let nextId = 0;
  return (method, params) => ({
    "jsonrpc": "2.0",
    "id": ++nextId,
    "method": method,
    "params": params
  });
})();

const send = url => (method, params) => {
  return request(url, {
    method: "POST",
    contentType: "application/json",
    json: "json",
    body: genPayload(method,params)
  }).then(answer => {
    var resp = answer;
    if (resp.error) {
      throw new Error(resp.error.message);
    } else {
      return resp.result;
    }
  }).catch(e => {
    return {error: e.toString()};
  });
};

module.exports = send;
