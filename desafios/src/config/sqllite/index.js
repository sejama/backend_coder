const sqlite3 = require('knex')({
    client: 'sqlite3',
	connection: {
		filename:'./src/database/ecommerce.sqlite'
    }
});

module.exports = sqlite3
