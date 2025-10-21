const express = require("express");
const mongoose = require("mongoose");

const mongoUrl = "mongodb+srv://massil:MassilDev@cluster0.riaqhf4.mongodb.net/";

mongoose.connect(mongoUrl,{}).then(()=>{
  console.log("MangoDB connected")
})
.catch((error)=>{
  console.error("MangoDB failed to connect" + error);
});

const app = express();
app.use(express.json());

app.get("/", async(req, res)=>{
    res.status(200).json({message:"Welcome to the game share management API ! "});
})


const PORT = 8080;

app.listen(PORT,()=>{
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});