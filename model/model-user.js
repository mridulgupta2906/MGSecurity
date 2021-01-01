const dbUtil=require('../dbUtil')

module.exports.addInUserTable=async(usertablecols,usertabledata)=>{
    let sqlQuery=`insert into "User" ${usertablecols} values ${usertabledata}`;
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
        console.log('error : (model-user--->addinusertable) :: ',error.message);
        await dbUtil.rollback(client);
    }
}



module.exports.addInAddressTable=async(addresstablecols,addresstabledata)=>{
    let sqlQuery=`insert into "address" ${addresstablecols} values ${addresstabledata}`;
    let data=[];
    let client = await dbUtil.getTransaction();
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
        console.log('error : (model-user--->addInAddressTable) :: ',error.message)
        await dbUtil.rollback(client);
    }
}


module.exports.getalluser=async()=>{
    let sqlQuery=`select * from "User"`;
    let data=[];
    let client=await dbUtil.getTransaction();
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
        console.log("error : (model-user--->getalluser())  ::",error.message)
        await dbUtil.rollback(client);
    }
}