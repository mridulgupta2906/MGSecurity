const puppeteer = require('puppeteer');
const sharp=require('sharp')
const firebase=require('../firebase')
const model=require('../model/model-logs');

const giveNumberPlateDetails=async(numberplate)=>{
    console.log("giveNumberPlateDetails hitted 2")
    let numb=numberplate;
    // const browser = await puppeteer.launch({
    //     headless:false
    //     }); 
    // const page = await browser.newPage(); 
    const chromeOptions = {
        headless: true,
        defaultViewport: null,
        args: [
            "--incognito",
            "--no-sandbox",
            "--single-process",
            "--no-zygote"
        ],
    };
    const browser = await puppeteer.launch(chromeOptions);
    const page = await browser.newPage();
    await page.goto('http://mis.mptransport.org/MPLogin/eSewa/VehicleSearch.aspx',{ waitUntil: 'networkidle2' });
    await page.type('#ctl00_ContentPlaceHolder1_txtRegNo',numb)
    console.log(page.click('#ctl00_ContentPlaceHolder1_btnShow'))
    //await page.waitForNavigation({ waitUntil: 'networkidle2' });

    await sleep(8000);
    const elements = await page.$x('//*[@id="ctl00_ContentPlaceHolder1_grvSearchSummary"]/tbody/tr[2]/td[2]/input')
    // console.log(elements)
    await elements[0].click() 
    await sleep(10000);
   const screenshotbuffer=await page.screenshot({encoding:'binary'});
   let path=`${numb}`;
   let imgurl=await firebase.uploadToFirebase(path,screenshotbuffer);
   console.log(screenshotbuffer)
   // await sharp(screenshotbuffer).toFile('image.png', (err, info) => {console.log("error ",err)});
   await browser.close();
   function sleep(ms) 
   {
       return new Promise((resolve) => {
           setTimeout(resolve, ms);
        })
    }
    return imgurl;
}


//mp11mw8141

// await sleep(8000);
//     const elements = await page.$x('//*[@id="ctl00_ContentPlaceHolder1_grvSearchSummary"]/tbody/tr[2]/td[2]/input')
//     await elements[0].click() 
//     await sleep(10000);
//    const screenshotbuffer=await page.screenshot({encoding:'binary'});
//    console.log(screenshotbuffer)
//     await sharp(inputBuffer).toFile('output.webp', (err, info) => {console.log("error ",err)});
//     await browser.close();







// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   var firebaseConfig = {
//     apiKey: "AIzaSyCeVd9OvexYVBJLR6To1wbc-nYvD7bFpTI",
//     authDomain: "mgsecurity-2020.firebaseapp.com",
//     projectId: "mgsecurity-2020",
//     storageBucket: "mgsecurity-2020.appspot.com",
//     messagingSenderId: "544540011511",
//     appId: "1:544540011511:web:566499649f00e68a291cf2",
//     measurementId: "G-MTND0GDYBY"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>

module.exports.vehicleEntryInLogs=async(req,res)=>{
    try
    {
        console.log("entryinlogs hitted 1")
        let numberplate=req.body.numberplate;
        let imgUrl=await giveNumberPlateDetails(numberplate);
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