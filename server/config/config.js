require('dotenv').config();
const config = {
	prod: 'production',
	port: process.env.PORT || 5000,
	db: process.env.DB_URL,
	expireTime: 24 * 60 * 60 * 10, //10 days in second
	secrets: {
		jwt: process.env.JWT || 'awesomeTeam',
		stripeSecretKey: process.env.STRIPE
	}
};

module.exports = config;