const router=require('express').Router();

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
router.post('/vehicleEntryInLogs',automation.vehicleEntryInLogs)




//  UI
router.post('/createuser',user.createuser)
router.post('/getalluser',user.getalluser);
router.post('/addvechileno',user.addvechileno);
router.post('/getalllogs',automation.getalllogs);

module.exports=router;