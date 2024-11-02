import jwt from "jsonwebtoken";
// import CUSTOMER from "../model/customerModel.js";

export const auth = async (req,res,next) => {
   

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({message:"unauthorized"});
    }
    const token = authHeader.split(" ")[1];

//     if(!token){
//         res.status(400).json({success:false,errMsg:"Unauthorized - Invalid token "})
//     }
// const decode = jwt.verify(token,process.env.JWT_SECRETE);
// if(!decode){
//     return res.status(401).json({success:false,errMsg:"invalid token provided"});
// }
// const user = await CUSTOMER.findbyId({decode.userId}).select("-password");
// if(!user){
//     return res.status(401).json({success:false,errMsg:"user not found"})
// }
try {
    const payload = jwt.verify(token, process.env.JWT_SECRETE);
req.user = {userId:payload.userId,firstName:payload.firstName,
    lastName:payload.lastName}
next()

} catch (error) {
   return res.status(401).json({message:"Auth failed"}) 
}
}
