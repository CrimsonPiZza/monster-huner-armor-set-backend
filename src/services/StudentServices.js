const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

require('dotenv').config();

class StudentServices {
	constructor() {}
	async allInfo() {
		const config = {
			headers: {
				cookie: process.env.KITPOINT_COOKIES.trim()
			}
		};
		try {
			let studentList = JSON.parse(fs.readFileSync(path.join(__dirname, '../asset/studentList.json')));
			if (studentList.length === 0) {
				const students = [];

				for (let i = 0; i <= 400; i++) {
					try {
						const results = await axios.get(`${process.env.KITPOINT_URL}/student/profile/${i}`, config);
						const $ = cheerio.load(results.data);

						const studentName = $('h3').text().split('Rank')[0].trim();

						if (studentName !== 'Edit User InfoChange Password') {
							students.push({ id: i, name: studentName.toLowerCase().split(' ').join('') });
						}
					} catch (e) {
						console.log(e.message);
					}
				}
				fs.writeFileSync(path.join(__dirname, '../asset/studentList.json'), JSON.stringify(students));
				studentList = JSON.parse(fs.readFileSync(path.join(__dirname, '../asset/studentList.json')));
			}

			return studentList;
		} catch (e) {
			console.log(e.message);
			return e;
		}
	}
	async getPointById(id) {
		const config = {
			headers: {
				cookie: process.env.KITPOINT_COOKIES.trim()
			}
		};
		try {
			const result = await axios.get(`${process.env.KITPOINT_URL}/student/profile/${id}`, config);
			const $ = cheerio.load(result.data);
			const img = $('img')['3'].attribs.src;
			const rank = $('small').text().split('Rank')[1].trim();
			const company = $('.fa.fa-building.user-profile-icon').parent().children()['0'].next.data.trim();
			const batch = $('.fa.fa-briefcase.user-profile-icon')['1'].next.data.trim();
			const realId = result.data.split('/student/overall/point/api/')[1].split(`', function(res)`)[0];
			const points = await axios.get(`${process.env.KITPOINT_URL}/student/overall/point/api/${realId}`, config);

			return { img, rank, company, batch, points: points.data };
		} catch (e) {
			return e;
		}
	}
	async getPointByName({name}) {
		const students = await this.allInfo();
		const { id } = students.find((student) => student.name === name);
		let info = await this.getPointById(id);
		info.pointURL = process.env.KITPOINT_URL
		return { error : false, message : `Successfully retreive student info.`, data : info};
	}
}

module.exports = new StudentServices();
