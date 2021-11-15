var sqlite3 = require('sqlite3').verbose() //npm install sqlite3
const bcrypt = require('bcryptjs');

//Creating a new database instance - Indication of connected database
//Before peforming any operations to database, make sure database is connected.
let db = new sqlite3.Database('./database/users.db', (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    } else{
        //Successful database connection
        console.log('Connected to the SQLite database.') 
    }
});

//Create a User
let createUser = (fname, lname, email, password) =>{
	var createUserSql =('INSERT INTO USERS (user_id, first_name, last_name, email, password) VALUES (?,?,?,?,?)');
	var params =[null, fname, lname, email, password];
    db.run('CREATE TABLE IF NOT EXISTS USERS ("user_id" INTEGER PRIMARY KEY AUTOINCREMENT, "first_name" STRING, "last_name" STRING, "email" STRING, "password" STRING)');
	db.run(createUserSql, params, function(err){
		if (err){
			return console.log(err.message);
		}
		console.log("User Created");
		console.log(`Rows inserted ${this.changes}`);	  
	});
}

let authenticateUser = (found_user, username, password, done) =>{

	var findUser = 'SELECT * FROM USERS WHERE email = ?';

	db.get(findUser, username, function (err, user) {
		console.log(user);
		if (!user) {
            console.log('not found');
            found_user = null;
		}
        else if(user.password == password){
            found_user = user;
            console.log(found_user);
        }  
	});
}

let deleteUser = (username) =>{
    var user = username;
    var deleteQuery = 'DELETE FROM USERS WHERE email = ?';
    db.run(deleteQuery, user, function(err){
		if (err){
			return console.log(err.message);
		}
		console.log("User Deleted");
		console.log(`Rows removed ${this.changes}`);	  
	});
    
}

let editUser = (fname, lname, old_email, email, password) =>{

    var editQuery = 'UPDATE USERS SET first_name = ?, last_name = ?, email = ?, password = ? WHERE email = ?';
    var params = [fname, lname, email, password, old_email];
    db.run(editQuery, params, function(err){
		if (err){
			return console.log(err.message);
		}
		console.log("User Updated");
		console.log(`Rows updated ${this.changes}`);
	});
    
}

let resetDb = () => {
    db.run('DELETE FROM USERS');
}

module.exports = {db, createUser, authenticateUser, resetDb, deleteUser, editUser};