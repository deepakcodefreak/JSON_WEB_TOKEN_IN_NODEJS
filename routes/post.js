const router = require('express').Router();
const {auth}  = require('../verifyToken')

router.get('/',auth,(req,res)=>{
    res.json({
        posts:{
            title:"dfsf",
            decription:"dfdgffgxgfdsg"
        }
    })
})

module.exports  = router;