const express = require('express');
const router = express.Router();
const StudentServices = require('../services/studentServices');

require('dotenv').config();

router.get('/getlinkid/all', async (req, res) => {
	const students = await StudentServices.allInfo();
	res.json(students);
});

router.get('/getstudentinfo', async (req, res) => {
	const {id} = req.query
	const student = await StudentServices.getPointById(id);
	res.json(student);
});

router.get('/infobyname', async (req, res) => {
	const student = await StudentServices.getPointByName(req.query);
	res.json(student);
});

module.exports = router;
