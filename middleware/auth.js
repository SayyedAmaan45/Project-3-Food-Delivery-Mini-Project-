const { x, func } = require("joi");
let { verifyAsync } = require("../helper/security");
let { User } = require("../schema/user");
const { error } = require("console");

async function auth(req, res, next) {
    // check if Token Exist
    let token = req.header("token")
    if (typeof (token) != "string") {
        return res.status(400).send({ error: "Please Provide Token" })
    }

    // Decrypt Token
    let decrypt = await verifyAsync(token).catch((error) => {
        return { error }
    })
    if (!decrypt || (decrypt && decrypt.error)) {
        return res.status(403).send({ error: "Invalid Token" })
    }
    // check if user id and token are present in DB

    let user = await User.findOne({ where: { token: token, id: decrypt.id } }).catch((error) => {
        return { error }
    })
    if (!user || (user && user.error)) {
        return res.status(403).send({ error: "Access Denied" })
    }

    // check if user is not Deleted
    if(user.isDeleted){
        return res.status(403).send({error:"User Data Has Been Deleted"})
    }

    req["userData"]={
        id:user.id,
        email:user.emailID,
        name:user.name,
        isActive:user.isActive
    }
    // pass req to next function
    next()
}

module.exports= auth;



