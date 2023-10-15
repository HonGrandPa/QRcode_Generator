import express from "express";
import {dirname} from "path"
import { fileURLToPath } from "url";
import qr from "qr-image";
import fs from "fs";
import bodyParser from "body-parser";


const port = 3000;
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", (req, res) =>{

    res.render(__dirname+"/views/index.ejs")
})


app.post("/submit", (req,res) => {

    //res.send("sucess")
    const url = req.body["url"];
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream(__dirname+"/public/qr_img.png"));
    
    setTimeout(() => {
        
        res.render(__dirname + "/views/index.ejs", {
            urlToGenerate : url
        });

    }, 100);

    
})


app.listen(port, (err) => {

    if(err) throw err;
    
    console.log(`Now connected to ${port}`);

})



