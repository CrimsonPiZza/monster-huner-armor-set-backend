const express = require("express");
const { auth } = require("firebase-admin");
const router = express.Router();
const authRequired = require("../utilities/verifyToken");
require("dotenv").config();

router.get("/",authRequired, async (req, res) => {
    res.send("Hello World!");
});

router.get("/getArmor", authRequired, async (req, res) => {
    
})

module.exports = router;
