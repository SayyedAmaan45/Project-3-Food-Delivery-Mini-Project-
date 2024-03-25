let {Sequelize,Model,DataTypes,Op,QueryTypes}=require("sequelize");
let config=require("config");
const { log } = require("console");
let mysql=config.get("mysql");


let sequelizeCon= new Sequelize (mysql);

sequelizeCon.authenticate().then(()=>{console.log("Connected to port");}).catch((error)=>{
    console.log("DB Error",error);
})


module.exports={sequelizeCon,Model,DataTypes,Op,QueryTypes}