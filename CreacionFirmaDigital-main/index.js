import express from "express";
import { jsPDF } from "jspdf";
import bodyParser from "body-parser";
import cors from 'cors';
import path from "path";
import CryptoJS from "crypto-js";

var app = express();
 //get PORT from the server
 //obtener el PUERTO del server donde hosteamos
const PORT = process.env.PORT;

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));
//end of global

const signPdf = async function(body){
    const data = "name : "+body.name+"msg : "+body.msg
    const resp = CryptoJS.SHA256(data).toString(CryptoJS.enc.Base64url)
    return resp
}

//Creacion del pdf
app.post("/pdf", async (req, res, next) => {
    const resp = await signPdf(req.body)
    res.end(resp)
});    

//dens js
app.get("/js", async (req, res, next) => {
    res.sendFile(path.resolve("html/js/script.js"))
});
//dens css
app.get("/css", async (req, res, next) => {
    res.sendFile(path.resolve("html/css/style.css"))
});
    
//send index
app.get("/", async (req, res, next) => {
    res.sendFile(path.resolve("html/index.html"))
});
    
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });  
