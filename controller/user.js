const { error } = require("console")
let auth = require("../model/user")


async function create(req, res) {
    let data = await auth.signUp(req.body).catch((error) => {
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

async function login(req,res){
    let data=await auth.login(req.body).catch((error) => {
        return { error }
    })

    console.log("data", data);
    if (!data || (data && data.error)) {
        let error = (data && data.error) ? data.error : "Internal Server Error"
        let status = (data && data.status) ? data.status : 500
        return res.status(status).send({ error })
    }
    return res.header("token",data.token).send({status:" User Login Successfully"})
}

async function logout(req, res) {
    let data = await auth.logout(req.userData).catch((error) => {
        return { error }
    })

    console.log("data", data);
    if (!data || (data && data.error)) {
        let error = (data && data.error) ? data.error : "Internal Server Error"
        let status = (data && data.status) ? data.status : 500
        return res.status(status).send({ error })
    }
    return res.send({status:"User Logout Successfully"})
}

module.exports = { create,login,logout }