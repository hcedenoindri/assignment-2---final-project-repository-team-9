var sqlite3 = require('sqlite3').verbose() //npm install sqlite3
const bcrypt = require('bcryptjs');

//Creating a new database instance - Indication of connected database
//Before peforming any operations to database, make sure database is connected.
let db = new sqlite3.Database('./database/task.sqlite', (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        //Successful database connection
        console.log('Connected to the SQLite database.') 
    }
});

//Create a User
let createUser = (id, email, password) =>{
	var createUserSql =('INSERT INTO USER (user_id, user_email,user_password) VALUES (?,?,?)')
	var params =[null, email, password];
    db.run('CREATE TABLE IF NOT EXISTS USER ("user_id" INTEGER PRIMARY KEY AUTOINCREMENT, "user_email" STRING, "user_password" STRING)');
	db.run(createUserSql, params, function(err){
		if (err){
			return console.log(err.message);
		}
		console.log("User Created");
		console.log(`Rows inserted ${this.changes}`);	  
	});
}

let authenticateUser = (username, password, done) =>{

	var findUser = 'SELECT * FROM USER WHERE user_email = ?';

	db.get(findUser, username, function (err, user) {
		console.log(user);
		if (!user) {
            console.log('not found');
            return done(null, false);
		}
		// bcrypt.compare(password, user.user_password, function (err, result) {
        //   console.log(password);
        //   console.log(user.user_password);
		//   if (err) {
        //     console.log('error')
		// 	return console.log(err.message);
		//   }
		//   if (result) {
        //     console.log('found');  
        //     return done(null, user);
		//   }
		// });

        let found_flag = false;
        let found_user = null;


        if(user.user_password == password){
            found_user = user;
            found_flag = true;
            console.log(found_flag);
        }

        if(found_flag){
            return done(null, found_user);
        }
  
	  });
}

module.exports = {db, createUser, authenticateUser};