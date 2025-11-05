const express = require("express");
const mongoose = require("mongoose");
const {AppError, asyncHandler} = require('./src/utils/error');
const {logger, requestLogger, consoleLogger} = require('./src/utils/logger');
const { errorHandler, notFoundHandler } = require('./src/middlewares/errorMiddleware');
require('dotenv').config();



const AuthRouter = require('./src/routes/authRouter');
const GamesRouter = require('./src/routes/gameRouter');
const UserRouter = require('./src/routes/userRouter');

const app = express();
app.use(express.json());
app.use(consoleLogger);
app.use(requestLogger);


const mongoUrl = process.env.MONGODB_URL;

mongoose.connect(mongoUrl,{}).then(()=>{
  console.log("MangoDB connected")
})
.catch((error)=>{
  console.error("MangoDB failed to connect" + error);
  process.exit(1);
});



app.get("/", async(req, res)=>{
    res.status(200).json({message:"Welcome to the game share management API ! "});
})

app.use("/auth", AuthRouter);
app.use("/games", GamesRouter);
app.use("/users", UserRouter);

app.use(errorHandler);
app.use(notFoundHandler);



const PORT = 8080;

app.listen(PORT,()=>{
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});