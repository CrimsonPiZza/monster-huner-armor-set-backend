const express = require("express");
const router = express.Router();
const authRequired = require("../middlewares/verifyToken");
const userServices = require("../services/userServices")
require("dotenv").config();

router.get("/",authRequired, async (req, res) => {
    res.send("Hello World!");
});

router.get("/signup",authRequired, async (req, res) => {
    const { user_id } = res.user
    const result = await userServices.signUp(user_id)
    res.json(result)
});

router.get("/getArmor", authRequired, async (req, res) => {
    
})

module.exports = router;
