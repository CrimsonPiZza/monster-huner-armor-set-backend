const bodyParser = require('body-parser');
const cors = require('cors');
const UserModel = require('../models/user')
require('dotenv').config();

// Import Routes
const userRoute = require('../routes/user');


module.exports = async (app) => {
	//MiddleWares
	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		next();
	});
	app.use(bodyParser.json({ limit: '10mb', extended: true }));
	app.use(cors());

	app.use('/user', userRoute);

	return app;
};
