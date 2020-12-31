const model=require('../model/model-accessdatabase')

module.exports.numberPlateCheckInDatabase=async(req,res)=>{
    try
    {
        let numberplate=req.body.numberplate;
        let details= await model.numberPlateCheckInDatabase(numberplate);
        if(details.rowCount>0)
        {
            return res.status(200).json({
                status:"success",
                statusCode:200,
                message:'response for check of avilability of this no. in database',
                data:details.rows
            })
        }
        else
        {
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"no required data found in database",
                data:[]
               })
        }
    }
    catch(error)
    {
        console.log('error :  (controller-accessdatabase-->numberPlateCheckInDatabase :: ',error.message)
    }
}