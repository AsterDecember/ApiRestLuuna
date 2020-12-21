const jwt = require('jsonwebtoken')
const config = require('../configs/config')

const jwtRoutes = (req,res,next) => {
    const token = req.headers['token'];

    if (token) {
        try{
            jwt.verify(token, config.key, (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: 'Invalid token try get one in /auth' });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        }catch (err) {
            console.log(err)
        }
    } else {
        res.status(400).send({
            message: 'Missing token in headers'
        });
    }
}

module.exports = {
    jwtRoutes
}