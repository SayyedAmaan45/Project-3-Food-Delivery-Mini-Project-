let order=require("../model/order")


async function orderPlaced(req,res){
    let data=await order.order(req.params.productId, req.body, req.userData).catch((error)=>{
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

module.exports={orderPlaced}
