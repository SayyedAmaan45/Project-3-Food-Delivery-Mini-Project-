let { Product } = require("../schema/product")
let joi = require("joi")
let { validate } = require("../helper/validation")


async function list() {
    // Find ALL
    let foodList = await Product.findAll().catch((error) => {
        return { error }
    })
    if (!foodList || (foodList && foodList.error)) {
        return { error: "Food Not Found", status: 404 }
    }
    // Return Response
    return { data: foodList }
}

async function details(productId) {
    // UserDAta VAlidation
    let schema = joi.object({
        id: joi.number().required()
    })
    let joiParams = {}
    joiParams["id"] = productId

    let check = await validate(schema, joiParams).catch((error) => {
        return { error }
    })
    if (!check || (check && check.error)) {
        return { error: check.error, status: 400 }
    }
    // Check if Product Exist
    let food = await Product.findOne({ where: { id: joiParams.id } }).catch((error) => {
        return { error }
    })
    if (!food || (food && food.error)) {
        return { error: "Product Not Found", status: 404 }
    }
    // Return Response
    return { data: food }

}


module.exports = { list, details }
