// Need to handle, re-fetching public keys from google https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com#
const jwt = require('jsonwebtoken')
const publicKeys = require("../../cache_firebase_publickey.json");
module.exports = async function auth(req, res, next) {
  const token = req.header("id_token");
  if (!token) return res.json({ invalid_token: "Access Denied" });

  try {
    const decode = jwt.decode(token, {complete: true})
    jwt.verify(token, publicKeys[decode.header.kid], function(err, decoded) {
      next();
    }); 
  } catch (err) {
    res.json({ invalid_token: "Access Denied" });
  }
};
