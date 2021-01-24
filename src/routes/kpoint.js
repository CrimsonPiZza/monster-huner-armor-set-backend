const express = require('express');
const router = express.Router();
const Student = require('../utilities/Student');

require('dotenv').config();

router.get('/getlinkid/all', async (req, res) => {
	const students = await Student.allInfo();
	res.json(students);
});

router.get('/getstudentinfo/:id', async (req, res) => {
	const student = await Student.getPointById(req.params.id);
	res.json(student);
});

router.get('/infobyname/:name', async (req, res) => {
	const student = await Student.getPointByName(req.params.name);
	res.json(student);
});

module.exports = router;
