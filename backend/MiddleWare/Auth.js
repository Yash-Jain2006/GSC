const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return res.status(403).json({
            message: "Unauthorized, jwt token is required",
        });
    }
    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err) {
        console.log(err);
        return res.status(403).json({
            message: "Unauthorized, jwt token wrong"
        });
    }
}

module.exports = isAuthenticated;