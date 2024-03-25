let {sequelizeCon,Model,DataTypes,Op}=require("../init/dbConfig");

class Order extends Model{}

Order.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    productID:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    userID:{
        type:DataTypes.INTEGER(),
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
    amountRecieved:{
        type:DataTypes.INTEGER(),
        allowNull:false
    }
 
},{tableName:"order",modelName:"Order",sequelize:sequelizeCon})
// Order.sync()

module.exports={Order}