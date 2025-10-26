const express = require("express");
const mongoose = require("mongoose");
const { errorHandler, notFoundHandler } = require('./src/middlewares/errorMiddleware');

const mongoUrl = "mongodb+srv://massil:MassilDev@cluster0.riaqhf4.mongodb.net/";
const AuthRouter = require('./src/routes/authRouter');

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

app.use("/auth", AuthRouter);

app.use(errorHandler);
app.use(notFoundHandler);



const PORT = 8080;

app.listen(PORT,()=>{
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});