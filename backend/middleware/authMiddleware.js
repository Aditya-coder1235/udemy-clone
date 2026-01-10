const jwt = require("jsonwebtoken");
require('dotenv').config()

const authMiddleware = (req, res, next) => {
    const token=req.cookies.token

    if (!token) {
        return res.status(401).json({ message: "Not authorized" });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid token" });

        req.user = decoded;
        next();
    })
    
};



module.exports=authMiddleware