const express = require("express");
const router = express.Router();
const authRequired = require("../middlewares/verifyToken");
const pagination = require("../middlewares/pagination");
const userServices = require("../services/userServices")
require("dotenv").config();

const ArmorsetModel = require("../models/armorset")

router.get("/", authRequired, async (req, res) => {
    res.send("Hello World!");
});

router.get("/signup", authRequired, async (req, res) => {
    const { user_id, name } = res.user
    const result = await userServices.signUp(user_id, name)
    res.json(result)
});

router.get("/getAllArmor", authRequired, pagination(ArmorsetModel), async (req, res) => {
    res.json(res.paginatedResults)
})

module.exports = router;
