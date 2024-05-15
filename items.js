const express = require("express")
const router = new express.Router()
const ExpressError = require("./expressError.js")
const items = require("./fakeDb.js")

router.get("/", (req, res) => {
    res.json( items )
})

router.post('/', (req, res, next) => {
    try {
        if (!req.body.name || !req.body.price) throw new ExpressError("Both name and price are required", 400)
        const item = { name: req.body.name, price: req.body.price };
        items.push(item)
        res.status(201).json({ added: item })            
    } catch(e) {
        return next(e)
    }
})

router.get('/:name', (req, res, next) => {
    const item = items.find(item => item.name === req.params.name);
    if (item === undefined) throw new ExpressError('Item cannot be found', 404);
    res.json( item ) 
})

router.patch('/:name', (req, res) => {
    const item = items.find(item => item.name === req.params.name);
    if (item === undefined) throw new ExpressError('Item cannot be found', 404);
    item.name = req.body.name;
    item.price = req.body.price;
    res.json({ updated: item })
})

router.delete('/:name', (req, res) => {
    const index = items.findIndex(item => item.name === req.params.name);
    if (index === -1) throw new ExpressError('Item cannot be found', 404);
    items.splice(index, 1)
    res.json({ message: "Deleted" })
})

module.exports = router;