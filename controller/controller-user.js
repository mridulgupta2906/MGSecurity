const model=require('../model/model-user')
const helper=require('../helper')


module.exports.createuser=async(req,res)=>{
    try
    {
        let cols=Object.keys(req.body);
        let data=Object.values(req.body);
        let addresstablecols='';
        let addresstabledata='';
        let usertablecols='';
        let usertabledata='';
        for(let i=0;i<cols.length;i++)
        {
            if(cols[i]=='address' || cols[i]=='vehicle')
            {
                if(cols[i]=='vehicle')
                {
                    addresstabledata=addresstabledata+`ARRAY['${data[i]}'],`;
                    addresstablecols=addresstablecols+`${cols[i]},`;
                }
                else
                {
                    addresstabledata=addresstabledata+`'${data[i]}',`;
                    addresstablecols=addresstablecols+`${cols[i]},`;
                }
            }
            else
            {
                usertabledata=usertabledata+`'${data[i]}',`;
                usertablecols=usertablecols+`${cols[i]},`;
            }
        }
        let addressid=helper.generateUUID();
       let newaddressid=addressid.split('-');
       let userid=helper.generateUUID();
       let newuserid=userid.split('-');
        usertablecols='('+usertablecols+`addressid,`+`userid`+')';
        // newusertablecols=usertablecols.substring(0,usertablecols.length-1);
        usertabledata=`(`+usertabledata+`'${newaddressid[0]}',`+`'${newuserid[0]}'`+')';
        addresstablecols=`(`+addresstablecols+`addressid`+')';
        addresstabledata='('+addresstabledata+`'${newaddressid[0]}'`+')';
        let details=await model.addInUserTable(usertablecols,usertabledata);
        let details2=await model.addInAddressTable(addresstablecols,addresstabledata);
        if(details.rowCount>0 && details.rowCount>0)
        {
            let result={
                details:details,
                details2:details2
            }
            return res.status(200).json({
                status:"success",
                statusCode:200,
                message:"user created , data entered in both user table and address table",
                data:result
            })
        }
        else
        {
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"user not created",
                data:[]
            })
        }
    }
    catch(error)
    {
        console.log("error : (controller-user--->createuser) :: ",error.message)
    }
}



module.exports.getalluser=async(req,res)=>{
    try
    {
        let details=await model.getalluser();
        if(details.rowCount>0)
        {
            return res.status(200).json({
                status:"success",
                statusCode:200,
                message:"All user data",
                data:details.rows
            })
        }
        else
        {
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"no data found",
                data:[]
            })
        }
    }
    catch(error)
    {
        console.log("error (controller-user--->getalluser()):",error.message);
    }
}


module.exports.addvechileno=async(req,res)=>{
 try
 {
    console.log(req.body.vehicleno);    
    let vehicleno=req.body.vehicleno;
    let userid=req.body.userid;
    let todo=req.body.todo;
    let result,check=0;
    if(todo=='add')
        {result=await model.addvechileno(userid,vehicleno);check++;console.log("1")}
    if(todo=='remove')
        {result=await model.removevechileno(userid,vehicleno);check++;console.log("1.2")}
    
    if(result)
    {
            return res.status(200).json({
                status:"success",
                statusCode:200,
                message:"All user data",
                data:result
            })
    }
    else
    {
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"no data found",
                data:[]
            })
    }
 }
 catch(error)
 {
        console.log("error (controller-user--->addvechileno()):  ",error);
        
 }
}