let express = require('express')
let router = express.Router()
const Product = require('../models/Product')
const {getDbObject} = require('../middleware/getDbObject.js')
const {jwtRoutes} = require('../middleware/protectedRoutes.js')

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

router.get("/:id", getDbObject(Product), (req, res) => {
    res.status(200).json(res.dbObject)
})

router.put("/:id",jwtRoutes, getDbObject(Product), async (req, res) => {
    try {
        const updatedProduct = await res.dbObject.set(req.body)
        const dbUpdatedProduct = await updatedProduct.save()
        res.status(200).json(dbUpdatedProduct)
    } catch (err) {
        res.status(400).json({ message: err.message })
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
