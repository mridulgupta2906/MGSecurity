const dbUtil=require('../dbUtil')

module.exports.numberPlateCheckInDatabase=async(numberplate)=>{
    let sqlQuery=`select addressid from "address" where $1=any(vehicle)`;
    let data=[numberplate];
    let sqlQuery2=`select * from "User" where addressid=$1`;
    let data2=[];
    let client =await dbUtil.getTransaction();
    try
    {
        let result=await dbUtil.sqlExecSingleRow(client,sqlQuery,data);
        if(result.rowCount>0)
        {
            let addressid=result.rows[0].addressid;
            data2=[addressid];
            let result2=await dbUtil.sqlExecSingleRow(client,sqlQuery2,data2)
            if(result2.rowCount>0)
            {
                result.rows[0]['details']=result2.rows[0];
            }
        }
        else
        {
            result={
                rows:[]
            }
        }
    await dbUtil.commit(client)
    return result;
    }
    catch(error)
    {
        console.log("error: (model-->model-accessdatabase) :: ",error.message);
        await dbUtil.rollback(client);
    }
}


