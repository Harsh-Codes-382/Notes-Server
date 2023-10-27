var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harshis$ood';

const fetchuser = (req,res,next)=>{
// Get the user from the jwt token and add it to req body
const token = req.header('auth-token'); 

if(!token){ 
   return  res.status(401).send({ error: "Please authenticate using valid token" });
}
try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next(); 
    
} catch (error) {
    return  res.status(401).send({ error: "Please authenticate using valid token" });
}
}
module.exports = fetchuser;