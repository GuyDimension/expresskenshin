var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'kenshin'
});
connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Conncted...!');
	}
});

module.exports = connection;