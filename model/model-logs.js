const dbUtil=require('../dbUtil')



const numberPlateCheckInDatabase=async(numberplate)=>{
    console.log("numberPlateCheckInDatabase hitted 4")
    
    let sqlQuery=`select addressid from "address" where $1=any(vehicle)`;
    let data=[numberplate];
    let client =await dbUtil.getTransaction();
    let status;
    try
    {
        let addressid;
        let result=await dbUtil.sqlExecSingleRow(client,sqlQuery,data);
        if(result.rowCount>0)
        {
            status='available';
            addressid=result.rows[0].addressid;
        }
        else
        {
            status='not available';
            addressid='null';
        }
    await dbUtil.commit(client)
    let Json={
        status:status,
        addressid:addressid
    }
    return Json;
    }
    catch(error)
    {
        console.log("error: (model-accessdatabase-->numberPlateCheckInDatabase()) :: ",error.message);
        await dbUtil.rollback(client);
    }
}

module.exports.vechileentryinlogs=async(vehicle_details,vehicleno)=>{
        console.log("INSERTING VECHILE ENTRY IN LOGS hitted 3");
        let sqlQuery=`insert into "logs" (vehicleno,date,time,status,addressid,vehicle_details) values($1,$2,$3,$4,$5,$6)`;
        let data=[];
        let Json=await numberPlateCheckInDatabase(vehicleno);
        let status=Json.status;
        let addressid=Json.addressid;
        let time=new Date().toLocaleTimeString();
        let date=new Date().toLocaleDateString();
        data=[vehicleno,date,time,status,addressid,vehicle_details];
        let client=await dbUtil.getTransaction();
        try
        {
            let result=await dbUtil.sqlExecSingleRow(client,sqlQuery,data);
            if(result.rowCount>0)
            {
                console.log("SUCCESSFULLY INSERTED");
            }
            await dbUtil.commit(client)
            return result;

        }
        catch(error)
        {
            console.log("error : (model-accesdatabase--> vechileentryinlogs()) :: ",error.message)
            await dbUtil.rollback(client);

        }

}


module.exports.getalllogs=async()=>{
    let sqlQuery=`select * from "logs"`;
    let data=[];
    let client =await dbUtil.getTransaction();
    try
    {
        let result=await dbUtil.sqlExecSingleRow(client,sqlQuery,data);
        if(result.rowCount>0)
        {
            await dbUtil.commit(client);
            return result;
        }
    }
    catch(error)
    {
        console.log("error : (model-logs--->getalllogs) :: ",error.message)
        await dbUtil.rollback(client);
    }
}