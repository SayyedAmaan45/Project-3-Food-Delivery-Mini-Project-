let { Order } = require("../schema/order")
let { Product } = require("../schema/product")
let joi = require("joi")
let { validate } = require("../helper/validation")



async function order(productId,params, userData) {
    // UserData Validation
    let schema = joi.object({
        id: joi.number().required(),
        qnty: joi.number().min(1).required()
    })
    let joiParams={...params}
    joiParams["id"]=productId

    let check = await validate(schema, joiParams).catch((error) => {
        return { error }
    })
    console.log("check",check);

    if (!check || (check && check.error)) {
        return { error: check.error, status: 400 }
    }
    //Check if Food Exist
    let food = await Product.findOne({ where: { id: joiParams.id } }).catch((error) => {
        return { error }
    })
    console.log("food",food);
    if (!food || (food && food.error)) {
        return { error: "Product Not Found", status: 404 }
    }
    // Check if Person is ordering Food is Login or Not
    // Check if there's enough stock for the order
    if (food.quantity < params.qnty) {
        return { error: "Insufficient stock for this product", status: 409 }
    }
    let totalBillableAmnt=food.BillableAmount*params.qnty
//    Data Formating
let data={
    userID:userData.id,
    productID:productId,
    quantity:params.qnty,
    price:food.price,
    disCountedPercentage:food.disCountedPercentage,
    disCountedAmount:food.disCountedAmount,
    gstPercentage:food.gstPercentage,
    BillableAmount:totalBillableAmnt,
    amountRecieved:totalBillableAmnt
}
// Insert Order Table
let insert=await Order.create(data).catch((error)=>{
    return {error}
})
console.log("insert",insert);
if(!insert || (insert && insert.error)){
    return {error:"Internal Server Error",status:500}
}
    // Update Into DB
    let update=await Product.update({quantity:food.quantity-params.qnty},{where:{id:productId}}).catch((error)=>{
        return {error}
    })
    console.log("update",update);

    if(!update || (update && update.error)){
        return {error:"Internal Server Error",status:500}
    }
    // Return Response
    return {message:"Your Order Has Been Placed Successfully",data:insert}

}

module.exports={order}





