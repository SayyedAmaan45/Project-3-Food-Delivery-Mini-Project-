let { User } = require("../schema/user");
let joi = require("joi")
let { validate } = require("../helper/validation");
let bcrypt = require("bcrypt");
let security = require("../helper/security");



async function signUp(params) {
    // User Data Valdation
    let schema = joi.object({
        userName: joi.string().min(5).max(155).required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).max(16).required(),
        phoneNo: joi.number().min(12).required()
    })
    let check = await validate(schema, params).catch((error) => {
        return { error }
    })
    if (!check || (check && check.error)) {
        return { error: check.error, status: 400 }
    }
    // Check if user Already Exist in DB
    let user = await User.findOne({ where: { emailID: params.email } }).catch((error) => {
        return { error }
    })
    if (user) {
        return { error: "User Already Exist", status: 409 }
    }
    // Hash PAssword
    let hash = await bcrypt.hash(params.password, 10).catch((error) => {
        return { error }
    })
    if (!hash || (hash && hash.error)) {
        return { error: "PAssWord is Not Created", status: 500 }
    }
    // Data Formatting
    let data = {
        name: params.userName,
        emailID: params.email,
        password: hash,
        contact: params.phoneNo
    }
    // Insert Data
    let insert = await User.create(data).catch((error) => {
        return { error }
    })
    if (!insert || (insert && insert.error)) {
        return { error: "Internal Server Erro", status: 500 }
    }
    // Return Response
    let response = {
        id: insert.id,
        userName: insert.name,
        email: insert.emailID,
        phoneNo: insert.contact,

    }
    return { data: response }
}

async function login(params) {
    // User Data Validation
    let schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).max(16).required(),
    })
    let check = await validate(schema, params).catch((error) => {
        return { error }
    })
    console.log("check", check);

    if (!check || (check && check.error)) {
        return { error: check.error, status: 400 }
    }
    // Check If User Exist
    let user = await User.findOne({ where: { emailID: params.email } }).catch((error) => {
        return { error }
    })
    console.log("user", user);

    if (!user || (user && user.error)) {
        return { error: "User NOt Found", status: 404 }
    }
    // Compare password
    let compare = await bcrypt.compare(params.password, user.password).catch((error) => {
        return { error }
    })
    console.log("compare", compare);

    if (!compare || (compare && compare.error)) {
        return { error: "Incorrect Password", status: 401 }
    }
    // Generate TOken
    let token = await security.signAsync({ id: user.id }).catch((error) => {
        return { error }
    })

    if (!token || (token && token.error)) {
        return { error: "Internal Server Error", status: 500 }
    }
    // Save TOken in DB
    let update = await User.update({ token },{where:{id: user.id }}).catch((error) => {
        return { error }
    })
    console.log("update", update);

    if (!update || (update && update.error)) {
        return { error: "User Not Login Yet...! Please Try Again", status: 500 }
    }
    // Return TOken
    return {token }
}

async function logout(userData){
    // UseData Validation
    let schema=joi.object({
        id:joi.number().required()
    })
    let check=await validate(schema,{id:userData.id}).catch((error)=>{
        return {error}
    })
    if(!check || (check&& check.error)){
        return {error:check.error,status:400}
    }
    // Update token as empty in DB
    let update=await User.update({token:""},{where:{id:userData.id}}).catch((error)=>{
        return {error}
    })
    if(!update || (update&& update.error)){
        return {error:"Internal Server Error",status:500}
    }
    // Return Response

    return {data:"Success"}


}
module.exports = { signUp, login, logout }