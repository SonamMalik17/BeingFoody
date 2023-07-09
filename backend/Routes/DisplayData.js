const express = require('express');
const router = express.Router();

router.post('/foodData',(req,res)=>{
    try {
        res.send([global.BeingFoody_items,global.BeingFoody_category]);
    } catch (error) {
        console.error(error.message);
        res.send("Server error");
    }
})

module.exports = router;