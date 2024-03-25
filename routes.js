let express=require("express")
let auth=require("./middleware/auth")
let foodController=require("./controller/food")
let cartController=require("./controller/Cart")
let orderController=require("./controller/order")

let authController=require("./controller/user")
let router=express.Router()


router.get("/",(req,res)=>{
    return res.send("welcome to my first Project")
})

// USer Related ROutes
router.post("/SignUp",authController.create)
router.post("/Login",authController.login)
router.put("/Logout",auth,authController.logout);

// Food Related ROutes
router.get("/FoodList",auth,foodController.foodList);
router.get("/FoodList/:id",auth,foodController.foodDetail)

// AddToCart Related ROutes
router.post("/AddToCart/:productId",auth,cartController.addToCart)
router.delete("/RemoveFromCart/:productId",auth,cartController.removeFromCart)

// AddToCart Related ROutes
router.post("/Order/:productId",auth,orderController.orderPlaced)





module.exports= router;