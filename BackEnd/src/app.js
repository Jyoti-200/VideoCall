//mongodb+srv://debasmitaacharya:<db_password>@cluster0.yyzdd.mongodb.net/
//XgsD8ppRfAPcRxDH -- DBpass
//import Server from "../FrontEnd/App.js";
import express from "express";
import { createServer } from "node:http";

 import { Server } from "socket.io";

 import mongoose, { STATES } from "mongoose";
 import { connectToSocket } from "./controllers/socketManager.js";

 import cors from "cors";
 import userRoutes from "./routes/userRoutes.js";

 const app = express();
 const server = createServer(app);
 const io = connectToSocket(server);

 app.set("port", (process.env.PORT || 8000));
 app.use(cors());
 app.use(express.json({limit: "40kb"}));
 app.use(express.urlencoded({limit: "40kb", extended: true}));

app.use("/api/v1/users", userRoutes);
// app.post("/register"); 

 app.get("/home", (req,res) => {
    return res.json({"hello": "World"})
 });
  
 const start = async () => {
   app.set("mongo_user");
    const connectionDB = await mongoose.connect("mongodb+srv://debasmitaacharya:XgsD8ppRfAPcRxDH@cluster0.yyzdd.mongodb.net/");
        
    console.log(`MONGO Connected DB Host: ${connectionDB.connection.host}`);
    server.listen(app.get("port"), () => {
        console.log("LISTENING ON PORT 8000");
    });
 }
 start();
