const mysql = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : '',
      database : 'coder_backend'
    }
  });

  const sqlite3 = require('knex')({
    client: 'sqlite3',
	  connection: {
		  filename:'./src/database/ecommerce.sqlite'
    }
  });

  module.exports = {mysql, sqlite3};