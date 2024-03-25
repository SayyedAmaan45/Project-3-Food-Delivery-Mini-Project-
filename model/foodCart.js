let { Cart } = require("../schema/cart")
let { Product } = require("../schema/product")
let joi = require("joi")
let { validate } = require("../helper/validation")


async function addToCart(productId, params, userData) {
    // User Data Validation
    let schema = joi.object({
        id: joi.number().required(),
        qty: joi.number().required()
    })
    let joiParams = { ...params }
    joiParams["id"] = productId

    let check = await validate(schema, joiParams).catch((error) => {
        return { error }
    })
    if (!check || (check && check.error)) {
        return { error: check.error, status: 400 }
    }
    // check if product already exits 
    let food = await Product.findOne({ where: { id: productId } }).catch((error) => {
        return { error }
    })
    if (!food || (food && food.error)) {
        return { error: "Food Item Not Found", status: 404 }
    }
    // check if cart product exits or not if not exits then add the product into the cart
    let cart = await Cart.findOne({ where: { productID: productId, userID: userData.id } }).catch((error) => {
        return { error }
    })
    if (!cart || (cart && cart.error)) {
        cart = await Cart.create({ productID: productId, userID: userData.id, quantity: params.qty })
    } else {
        cart.quantity = params.qty,
            cart.save()
    }
    return { data: cart }
}

async function removeFromCart(productId, userData) {
    // UserData Validation
    let schema = joi.object({
        id: joi.number().required()
    })
    let joiParams = {}
    joiParams["id"] = productId
    let check = await validate(schema, joiParams).catch((error) => {
        return { error }
    })
    console.log("check", check);

    if (!check || (check && check.error)) {
        return { error: check.error, status: 400 }
    }
    // Check if product Exist

    let food = await Product.findOne({ where: { id: productId } }).catch((error) => {
        return { error }
    })
    console.log("food", food);

    if (!food || (food && food.error)) {
        return { error: "Food Item Not Found", status: 404 }
    }
    // Check if Product is Not Deleted 
    if (food.isDeleted == true || food.isActive == false) {
        return { error: "Food Item Out Of Stock", status: 403 }
    }
      // Remove Food Item From Cart
      let RemoveCartItem=await Cart.destroy({where:{productID:productId}}).catch((error) => {
        return { error }
    })
    console.log("RemoveCartItem", RemoveCartItem);

    if (!RemoveCartItem || (RemoveCartItem && RemoveCartItem.error)) {
        return { error: "Internal Server Error", status: 500 }
    }
    // Return Response
    return {data:RemoveCartItem}
    }


module.exports = { addToCart,removeFromCart }







