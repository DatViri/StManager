require('dotenv').config();
const config = {
	prod: 'production',
	port: process.env.PORT,
	db: process.env.DB_URL,
	expireTime: 24 * 60 * 60 * 10, //10 days in second
	secrets: {
		jwt: process.env.JWT || 'awesomeTeam',
	}
};

module.exports = config;