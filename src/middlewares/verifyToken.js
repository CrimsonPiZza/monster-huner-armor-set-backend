// Need to handle, re-fetching public keys from google https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com#
const jwt = require('jsonwebtoken')
const publicKeys = require("../../cache_firebase_publickey.json");
module.exports = async function authRequired(req, res, next) {
  console.log("Get some request man!")
  const token = req.header("id_token");
  if (!token) return res.json({ invalid_token: "Access Denied" });
  try {
    const { payload, header } = jwt.decode(token, {complete: true})
    jwt.verify(token, publicKeys[header.kid], function(err, decoded) {
      res.user = {
        user_id: payload.user_id,
        name: payload.name
      }
      next();
    }); 
  } catch (err) {
    res.json({ invalid_token: "Access Denied" });
  }
};
