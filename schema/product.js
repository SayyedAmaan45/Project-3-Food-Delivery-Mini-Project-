let {sequelizeCon,Model,DataTypes,Op}=require("../init/dbConfig");

class Product extends Model{}

Product.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING(),
        allowNull:false
    },
    description:{
        type:DataTypes.STRING(),
        allowNull:false
    },
    type:{
       type:DataTypes.ENUM("veg","Non-veg"),
       allowNull:false 
    },
    quantity:{
        type:DataTypes.INTEGER(),
        allowNull:false
    },
    price:{
        type:DataTypes.INTEGER(),
        allowNull:false
    },
    disCountedPercentage:{
        type:DataTypes.INTEGER(),
        allowNull:false
    },
    disCountedAmount:{
        type:DataTypes.INTEGER(),
        allowNull:false
    },
    gstPercentage:{
        type:DataTypes.INTEGER(),
        allowNull:false
    },
    BillableAmount:{
        type:DataTypes.INTEGER(),
        allowNull:false
    },
    deliveryCharge:{
        type:DataTypes.INTEGER(),
        allowNull:false
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
 
},{tableName:"product",modelName:"Product",sequelize:sequelizeCon})
// Product.sync()

module.exports={Product}