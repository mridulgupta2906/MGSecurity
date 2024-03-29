// const puppeteer = require('puppeteer');
// const sharp=require('sharp')
const firebase=require('../firebase')
const model=require('../model/model-logs');
var userAgent = require('user-agents');
const helper=require('../helper')
const fs=require('fs')
const Jimp = require("jimp");

const giveNumberPlateDetails=async(numberplate,imgbuffer)=>{
    console.log("giveNumberPlateDetails hitted 2")
    let numb=numberplate;
    // const browser = await puppeteer.launch({
    //     headless:false
    //     }); 
    // const page = await browser.newPage(); 
//     const chromeOptions = {
//         headless: false,
//         defaultViewport: null,
//         args: [
//             "--incognito",
//             "--no-sandbox",
//             "--single-process",
//             "--no-zygote"
//         ],
//     };
//     const browser = await puppeteer.launch(chromeOptions);
//     const page = await browser.newPage();
//     await page.setUserAgent('5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');

//     await page.goto('http://mis.mptransport.org/MPLogin/eSewa/VehicleSearch.aspx',{ waitUntil: 'networkidle2' });
//     await page.type('#ctl00_ContentPlaceHolder1_txtRegNo',numb)
//     console.log(page.click('#ctl00_ContentPlaceHolder1_btnShow'))
//     //await page.waitForNavigation({ waitUntil: 'networkidle2' });

//     await sleep(8000);
//     const elements = await page.$x('//*[@id="ctl00_ContentPlaceHolder1_grvSearchSummary"]/tbody/tr[2]/td[2]/input')
//     // console.log(elements)
//     await elements[0].click() 
//     await sleep(10000);
//    const screenshotbuffer=await page.screenshot({encoding:'binary'});
   let namenumber=helper.generateUUID();
   let path=`${namenumber}`;
   let imgurl=await firebase.uploadToFirebase(path,imgbuffer);
//    console.log(screenshotbuffer)
   // await sharp(screenshotbuffer).toFile('image.png', (err, info) => {console.log("error ",err)});
//    await browser.close();
//    function sleep(ms) 
//    {
//        return new Promise((resolve) => {
//            setTimeout(resolve, ms);
//         })
//     }
    return imgurl;
}


module.exports.vehicleEntryInLogs=async(req,res)=>{
    try
    {
        console.log("entryinlogs hitted 1")
        let numberplate=req.body.numberplate;
        // let imgbuffer=req.body.imgbuffer;
        const imgbuffer = await Buffer.from(req.body.imgbuffer, "base64");
        let imgUrl=await giveNumberPlateDetails(numberplate,imgbuffer);
        if(imgUrl!=null)
        {
            let details=await model.vechileentryinlogs(imgUrl,numberplate);
            if(details.rowCount>0)
            {
                return res.status(200).json({
                    status:"success",
                    statusCode:200,
                    message:"vechile owner details image url stored in database",
                    data:details.rows
                })
            }
            else
            {
                return res.status(200).json({
                    status:"error",
                    statusCode:400,
                    message:"details.rowCount is not > 0",
                    data:[]
                })
            }
        }
    }
    catch(error)
    {
        console.log("error : (controller-automation-->entryinlogs()) :: ",error)
    }
}



module.exports.getalllogs=async(req,res)=>{
    try
    {
        let details=await model.getalllogs();
        if(details.rowCount>0)
            {
                return res.status(200).json({
                    status:"success",
                    statusCode:200,
                    message:"all data from logs table",
                    data:details.rows
                })
            }
            else
            {
                return res.status(200).json({
                    status:"error",
                    statusCode:400,
                    message:"details.rowCount is not > 0",
                    data:[]
                })
            }
    }
    catch(error)
    {
        console.log("error : (controller-automation-->getalllogs()) :: ",error.message)

    }
}