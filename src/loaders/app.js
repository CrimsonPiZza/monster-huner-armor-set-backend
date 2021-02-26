const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require("firebase-admin");
const serviceAccount = require("../../mh-fashionset-privatekey.json");

require('dotenv').config();

// Import Routes
// const adminRoute = require('../routes/admin');
const userRoute = require('../routes/user');

// Initialize Firebase Admin
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

module.exports = async (app) => {
	//MiddleWares
	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		next();
	});
	app.use(bodyParser.json({ limit: '10mb', extended: true }));
	app.use(cors());

	// app.use('/admin', adminRoute);
	app.use('/user', userRoute);

	return app;
};
