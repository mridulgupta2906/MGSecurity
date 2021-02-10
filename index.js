const express=require('express');
const app=express();
const route=require('./routes')
const port=process.env.PORT || 3000;
const bodyparser=require('body-parser');

app.use(bodyparser.urlencoded({extended:true,limit:'50mb'}))
app.use(bodyparser.json({limit:'50mb'}));

app.use('/',route);

app.listen(port,()=>{
    console.log("SERVER STARTED :",port)
})