const express = require('express');

const path = require('path');

const router = express.Router();

router.get("/add-product", (req, res, next) => {
    console.log("In Another MiddleWare");
    res.sendFile(path.join(__dirname,'../','views','add-product.html'));
});

router.post("/product", (req, res, next) => {
    console.log("product body", req.body);
    res.redirect("/")
});

module.exports = router;