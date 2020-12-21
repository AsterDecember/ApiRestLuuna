let express = require('express')
let router = express.Router()
const User = require('../models/User')
const {getDbObject} = require('../middleware/getDbObject.js')
const jwt = require('jsonwebtoken')
const config = require('../configs/config')

router.post('/', async (req, res) => {
    if(req.body.email) {
        let user = await  User.findOne({email:req.body.email}).exec();
        if ( user === null) {
            res.status(401).json({ mensaje: "Create user with email  Post: /users"})
        }
        const payload = {
            check:  true
        }
        const token = jwt.sign(payload, config.key, {
            expiresIn: 2456200
        })
        res.status(200).json({
            message: 'Success',
            token: token
        })
    } else {
        res.status(401).json({ mensaje: "Send email in order to auth"})
    }
})

module.exports = router