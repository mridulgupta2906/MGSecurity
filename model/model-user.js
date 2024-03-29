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

module.exports.addvechileno=async(userid,vehicleno)=>{
    let sqlQuery=`select vehicle from "address" where addressid= (select addressid from "User" where userid=$1)`;
    let data=[userid];
    let sqlQuery2=`update "address" set vehicle=$2 where addressid=(select addressid from "User" where userid=$1)`;
    let data2=[];
    let client =await dbUtil.getTransaction();
    try
    {
        let result=await dbUtil.sqlExecSingleRow(client,sqlQuery,data);
        // console.log("result : ",result);
        if(result.rowCount>0)
        {
            let arr=[];
            arr=result.rows[0].vehicle;
            arr.push(vehicleno);
            data2=[userid,arr];
            let result2=await dbUtil.sqlExecSingleRow(client,sqlQuery2,data2);
            // console.log("result2 : ",result2);
            if(result2.rowCount>0)
            {
                await dbUtil.commit(client);
                return result2;
            }
        }
    }
    catch(error)
    {
        console.log("error : (model-user--->addvechileno())  ::",error.message)
        await dbUtil.rollback(client);
    }
}



module.exports.removevechileno=async(userid,vehicleno)=>{
    let sqlQuery=`select vehicle from "address" where addressid= (select addressid from "User" where userid=$1)`;
    let data=[userid];
    let sqlQuery2=`update "address" set vehicle=$2 where addressid=(select addressid from "User" where userid=$1)`;
    let data2=[];
    let client =await dbUtil.getTransaction();
    try
    {
        let result=await dbUtil.sqlExecSingleRow(client,sqlQuery,data);
        if(result.rowCount>0)
        {
            let arr=result.rows[0].vehicle;
            let brr=[],j=0;
            if(arr.length>0)
            {
                for(let i=0;i<arr.length;i++)
                {
                    if(arr[i]==vehicleno){}
                    else
                    { brr[j]=arr[i];j++;}
                }
            }
            data2=[userid,brr];
            let result2=await dbUtil.sqlExecSingleRow(client,sqlQuery2,data2);
            if(result2.rowCount>0)
            {
                await dbUtil.commit(client);
                return result2;
            }
        }
    }
    catch(error)
    {
        console.log("error : (model-user--->removevechileno())  ::",error.message)
        await dbUtil.rollback(client);
    }
}