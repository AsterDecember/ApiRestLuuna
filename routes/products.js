let express = require('express')
let router = express.Router()
const Product = require('../models/Product')
const User = require('../models/User')
const {getDbObject} = require('../middleware/getDbObject.js')
const {createDbLog} = require('../middleware/createLog.js')
const {jwtRoutes} = require('../middleware/protectedRoutes.js')
const {sendEmailOnChange} = require('../helpers/sendEmailChanges.js')

router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.post("/",jwtRoutes, async (req, res) => {
    const product = new Product({
        sku: req.body.sku,
        name: req.body.name,
        price: req.body.price,
        brand: req.body.brand,
    })
    try {
        const newProduct = await product.save()
        res.status(201).json({ newProduct })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.get("/:id", getDbObject(Product),createDbLog, (req, res) => {
    res.status(200).json(res.dbObject)
    if (res.newLog) {
        res.newLog.success = true
        res.newLog.save()
    }
})

router.put("/:id",jwtRoutes, getDbObject(Product),createDbLog, async (req, res) => {
    try {
        const updatedProduct = await res.dbObject.set(req.body)
        const dbUpdatedProduct = await updatedProduct.save()
        res.status(200).json(dbUpdatedProduct)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
    if (res.newLog) {
        res.newLog.success = true
        res.newLog.save()
        let users = await User.find().select('email -_id')
        let emailsString = users.map(function(user){
            return user.email;
        }).join(",");
        await sendEmailOnChange(emailsString)
    }
})

router.delete("/:id",jwtRoutes, getDbObject(Product), async (req, res) => {
    try {
        await res.dbObject.deleteOne()
        res.json({ message: "Product has been deleted" })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = router
