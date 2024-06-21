const {
    createPool
} =require('mysql');

const pool = createPool({
    host:"localhost",
    user:"root",
    password: "",
    database: "top_up"
})

pool.query('select * from top_up', (err, result, fields)=>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
})