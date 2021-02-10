const router=require('express').Router();
// const sharp = require('sharp');
const fs = require("fs");
var base64Img = require('base64-img');



const hasura=require('./controller/controller-hasurahit')
const accessdb=require('./controller/controller-accessdatabase');
const automation=require('./controller/controller-logs');
const { accessSync } = require('fs');
const user=require('./controller/controller-user');


//  testing of server
router.post('/check',(req,res)=>{
    res.status(200).json({
        status:"success",
        statusCode:200,
        message:"successfully hitted api /check",
        data:[]
    })
})


// explicit realtime api hits by hasura
// router.post('/hasurahitstartpythoncode',hasura.startpythoncode)     //yet to complete only initalised

//CALL AUTOMATION
// router.post('/callautomation',automation.giveNumberPlateDetails)

// check for numberplate is available in database or not
// router.post('/numberPlateCheckInDatabase',accessdb.numberPlateCheckInDatabase)

// INTERNAL PYTHON HIT
router.post('/vehicleEntryInLogs',automation.vehicleEntryInLogs)  // number plate no and image buffer to be sent by python




//  UI
router.post('/createuser',user.createuser)
router.post('/getalluser',user.getalluser);
router.post('/addvechileno',user.addvechileno);
router.post('/getalllogs',automation.getalllogs);

//image test
router.post('/image',(req,res)=>{
    // let imgbuffer=req.body.imgbuffer;
    // console.log(imgbuffer)
    // base64Img.img(imgbuffer, '', '1', function(err, filepath) {});
    // fs.writeFileSync("new-path.jpg", imgbuffer,{encoding:'base64'},function(err){
    //     console.log(err)
    // });
    // sharp(imgbuffer)
    // .toFile('output.jpg', (err, info) => {console.log(err)});
})

module.exports=router;