//importo mysql2
const mysql = require("mysql2");
// creo la connessione al database
const connessione = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "route",
    database: "db_blog"
})
//instauro una connessione al database
connessione.connect((err) =>{
    if(err){
        console.log(err)
    }
    else{
        console.log("connesso con mysql!")
    }
})

module.exports = connessione;