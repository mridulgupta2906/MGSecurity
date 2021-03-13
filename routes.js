const router=require('express').Router();
// const sharp = require('sharp');
const fs = require("fs");
var base64Img = require('base64-img');
const hasura=require('./controller/controller-hasurahit')
const accessdb=require('./controller/controller-accessdatabase');
const automation=require('./controller/controller-logs');
const { accessSync } = require('fs');
const user=require('./controller/controller-user');
const fetch = require('node-fetch');
const imageToBase64 = require('image-to-base64');

const { json } = require('body-parser');


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


// INTERNAL PYTHON HIT
router.post('/vehicleEntryInLogs',automation.vehicleEntryInLogs)  // number plate no and image buffer to be sent by python

//  UI
router.post('/createuser',user.createuser)
router.get('/getalluser',user.getalluser);
router.post('/addvechileno',user.addvechileno);
router.get('/getalllogs',automation.getalllogs);


// //for knaman testing
// router.post('/knaman',async(req,res)=>{
//     let imgbuffer;
//    await imageToBase64("sova.jpg") // Path to the image
//     .then(
//         (response) => {
//             // console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
//             imgbuffer=response;
//         }
//     )
//     .catch(
//         (error) => {
//             console.log(error); // Logs an error if there was one
//         }
//     )
//     const data = { 
//         "imgbuffer": `${imgbuffer}`,
//         "scholarno":"02",
//         "class":"10"
//     };
//         // console.log(body)
//     await fetch('http://localhost:4000/addreportcardimage', {
//         method: 'post',
//         body:    JSON.stringify(data),
//         headers: { 'Content-Type': 'application/json' },
//     })
//     .then(res => res.json())
//     .then(json => console.log(json));
// })

module.exports=router;