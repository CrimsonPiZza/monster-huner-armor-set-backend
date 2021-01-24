const jwt = require("jsonwebtoken");
require("dotenv").config();

const token = jwt.sign(
    { role : 'admin' },
    process.env.TOKEN_SECRET,
    { expiresIn: '24h' }
);

console.log(token)
