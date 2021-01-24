const express = require("express");
const router = express.Router();
const verify = require("../utilities/verifyToken");
const AdminService = require("../services/adminServices");
const { async } = require("validate.js");
const student = require("../models/student");
const adminService = new AdminService();
require("dotenv").config();


// Create New Session from existing date
router.post("/createNewSession", verify, async (req, res) => {
    const {date, session_name, startTime, endTime} = req.body
    const result = await adminService.createNewSession(date, session_name, startTime, endTime);
    res.json(result);
});

// Register Absentees to existing Session
router.post("/registerSessionAbsentees", verify, async (req, res) => {
    const {session_id, students} = req.body
    const result = await adminService.registerSessionAbsentees(session_id, students)
    res.json(result)
}) 

// Register new Students to Database
router.post("/registerNewStudents", verify, async (req, res) => {
    const {students} = req.body
    const result = await adminService.registerNewStudents(students)
    res.json(result)
})

// Get all Dates Model data
router.get("/getAllDates", async (req, res) => { 
    const result = await adminService.getAllDates(req.query)
    res.json(result)
})

router.get("/getDate", async (req, res) => {
    const result = await adminService.getDate(req.query)
    res.json(result)
})

router.get("/", async (req, res) => {
    res.send("Hello World!");
});

module.exports = router;
