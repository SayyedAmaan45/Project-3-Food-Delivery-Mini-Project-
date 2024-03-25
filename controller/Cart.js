const { error, log } = require("console")
let auth = require("../model/foodCart")

async function addToCart(req, res) {
    let data = await auth.addToCart(req.params.productId, req.body, req.userData).catch((error) => {
        return { error }
    })

    console.log("data", data);
    if (!data || (data && data.error)) {
        let error = (data && data.error) ? data.error : "Internal Server Error"
        let status = (data && data.status) ? data.status : 500
        return res.status(status).send({ error })
    }
    return res.send({ data: data.data })
}
async function removeFromCart(req, res) {
    let data = await auth.removeFromCart(req.params.productId, req.userData).catch((error) => {
        return { error }
    })

    console.log("data", data);
    if (!data || (data && data.error)) {
        let error = (data && data.error) ? data.error : "Internal Server Error"
        let status = (data && data.status) ? data.status : 500
        return res.status(status).send({ error })
    }
    return res.send({ data: "Food Item Has Been Removed From The Cart Successfully" })
}

module.exports = { addToCart, removeFromCart }