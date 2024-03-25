let {sequelizeCon,Model,DataTypes,Op}=require("../init/dbConfig")


class User extends Model{}

User.init({
    id:{
        type:DataTypes.INTEGER(),
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING(),
        allowNull:false
    },
    emailID:{
        type:DataTypes.STRING(),
        allowNull:false
    },password:{
        type:DataTypes.STRING(),
        allowNull:false
    },
    contact:{
        type:DataTypes.INTEGER(),
        allowNull:false
    },otp:{
        type:DataTypes.STRING(300),
        allowNull:true
    },
    token:{
        type:DataTypes.STRING(500)
    },
    isDeleted:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
        allowNull:false
    },
    isActive:{
        type:DataTypes.BOOLEAN,
        defaultValue:true,
        allowNull:false
    }
},{tableName:"user",modelName:"User",sequelize:sequelizeCon})
// User.sync()

module.exports={User}