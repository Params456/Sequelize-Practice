const {Sequelize, DataTypes, STRING} = require("sequelize");
const express = require("express");
const app = express();
const router = express.Router()

app.use(express.json())
app.use(router)

// Connection
const sequelize = new Sequelize("postgres" , "postgres" , "sociallab",{
    host: "localhost",
    dialect : "postgres"
});

sequelize
    .authenticate()
    .then(err=>{
        console.log("Connection has been established successfully");
    })
    .catch(err=>{
        console.log("unable to connect database ", err);
    })

//connecction ends

//creating table
var User  = sequelize.define("user",{
    username :{type:DataTypes.STRING},

    password:{type:DataTypes.STRING},

    age:{type:DataTypes.INTEGER},
    
},{tableName:"sample"})


User.create()
//Creating table ends 


router.get("/get",(req,res)=>{
    User.findAll({where:{age:[19,20]}})
    .then((users)=>{
        res.send(users)
    })
    .catch(err=>{
        console.log(err);
    })
})


router.post("/insert",(req,res)=>{
    let {body} = req;
    let {username, password, age} = body;
    User.create({username:username,password:password,age:age})
    .then(result=>{
        res.json({message:"inserted successfully"})
    })
    .catch(err=>{
        console.log(err);
    })
})

router.put("/update/:id",(req,res)=>{
    User.update({username:req.body.username},{
        where:{id:req.params.id}
    })
    .then(result=>{
        res.send("updated sucessfully")
    })
    .catch(err=>{
        res.send(err)
    })
})

router.delete("/del/:id",(req,res)=>{
    User.destroy({
        where:{id:req.params.id}
    })
    .then(result=>{
        res.send("deleted successfully")
    })
    .catch(err=>{
        res.send(err)
    })
})

module.exports = app