const { error } = require("console")
let auth=require("../model/food")


async function foodList(req,res){
    let data=await auth.list().catch((error)=>{
        return {error}
    })
    if(!data || (data && data.error)){
        let error=(data&& data.error) ? data.error:"Internal Server Error"
        let status=(data&& data.status) ? data.status:500
        return res.status(status).send({error})
    }
    return res.send({data:data.data})
}
async function foodDetail(req,res){
    let data=await auth.details(req.params.id).catch((error)=>{
        return {error}
    })
    console.log("data", data);

    if(!data || (data && data.error)){
        let error=(data&& data.error) ? data.error:"Internal Server Error"
        let status=(data&& data.status) ? data.status:500
        return res.status(status).send({error})
    }
    return res.send({data:data.data})
}

module.exports={foodList,foodDetail}