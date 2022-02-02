const express = require("express");
const mysql = require("mysql2");
const bodyparser = require("body-parser");
const port = 4040;
const app = express();
app.use(bodyparser.json());

app.listen(port, () => {
  console.log("port listining");
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "student",
  port: 4306,
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("db connected");
  }
});

// 1st getting the data from the database

app.get("/std/:id", function (req, res) {
  let id = req.params.id;
  let qry = "SELECT * FROM `marklist` where std_id = " + id + "";
  db.query(qry, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.length > 0) {
      res.send({ status: true, msg: "success", data: result });
    } else {
      res.send({ status: false, msg: error });
    }
  });
});

// 2nd inserting data into the database

app.post("/std/add", function (req, res) {
  let name = req.body.name;
  let lang = req.body.lang;
  let maths = req.body.maths;
  let science = req.body.science;
  let social = req.body.social;

  console.log(name);

  qry =
    "INSERT INTO marklist(name, lang, maths, science, social) VALUES ('" +
    name +
    "', '" +
    lang +
    "', '" +
    maths +
    "', '" +
    science +
    "', '" +
    social +
    "')";
  db.query(qry, function (err, result) {
    if (err) {
      res.send(err);
    }
    if (result.affectedRows > 0) {
      res.send({ status: true, msg: "success", data: result });
    } else {
      res.send({ status: false, msg: "error" });
    }
  });
});

// 3rd deleting a record from database

app.delete("/std/dl", function(req, res){
    let id = req.body.id;
    let qry = 'DELETE FROM marklist WHERE stu_id= "' + id +'"';
    console.log(qry);
    db.query(qry, function(err,result){
        if (err) {
            res.send(err);
        }
        console.log(result)
        if (result.affectedRows > 0){
            res.send({status:true,msg:"success",data:result});
        }
        else{
            res.send({status:false,msg:"error"})
        }
    })

})


// update a record indatabase

app.post("/std/up", function(req, res){
    let id = req.body.id;
    let qry='UPDATE marklist SET maths="99" WHERE stu_id= "' + id +'"';
    console.log(qry)

    db.query(qry, function(err,result){
        if (err) {console.log(err);}

        console.log(result);
        
        if(result.affectedRows > 0){
            res.send({status: true, msg: 'success'});
        }else{
            res.send({status: false, msg: 'failed'});
        }
    })
})

// fetch entire table

app.get("/", function(req,res){
    let qry = 'SELECT * FROM marklist';
    console.log(qry);
    db.query(qry,function(err,result){
        if (err) {console.log(err);}
        if (result.length> 0){
            res.send({ status: true, msg: "success", data: result });
        }
        else{
            res.send({ status: false, msg: "error"});
        }
    })
})
