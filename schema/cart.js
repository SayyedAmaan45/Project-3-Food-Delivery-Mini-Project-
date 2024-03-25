let {sequelizeCon,Model,DataTypes,Op}=require("../init/dbConfig");

class Cart extends Model{}

Cart.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    quantity:{
        type:DataTypes.INTEGER(),
        allowNull:false
    },
    productID:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    userID:{
        type:DataTypes.INTEGER(),
        allowNull:false
    }
},{tableName:"cart",modelName:"Cart",sequelize:sequelizeCon})
// Cart.sync()

module.exports={Cart}