let express=require("express")
let config=require("config")
let router=require("./routes");
const { urlencoded } = require("body-parser");
let app=express();
let port=config.get("port")


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(router);

app.listen(port,()=>{
    console.log(`Connected to port ${port}`);
})