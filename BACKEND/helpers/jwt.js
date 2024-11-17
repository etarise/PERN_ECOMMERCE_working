const { expressjwt: jwt } = require("express-jwt");

function authJwt() {
  let secret = process.env.API_SECRECT;
  return jwt({
    secret,
    algorithms: ["HS256"],
  }).unless({ path: ["/api/v1/users/login"] });
}
module.exports = authJwt;
