const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const adminRoute = require('../routes/admin');
const pointRoute = require('../routes/kpoint');

module.exports = async (app) => {
	//MiddleWares
	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		next();
	});
	app.use(bodyParser.json({ limit: '10mb', extended: true }));
	app.use(cors());
	app.use('/admin', adminRoute);
	app.use('/point', pointRoute);
	return app;
};
