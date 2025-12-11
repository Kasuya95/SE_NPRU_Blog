const express = require("express")
require('dotenv').config()
const cors = require("cors")
const mongoose = require("mongoose")

const app = express();
const PORT  = process.env.PORT;
const BASE_URL = process.env.BASE_URL;
const DB_URL = process.env.DB_URL;

app.use(cors({ origin: BASE_URL, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.get("/",(req,res)=> {
    res.send("<h1>Welcome kub oun</h1>")
})

if (!DB_URL) {
  console.error("DB URL is missing. Please set it in your . env file");
} else {
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("MongoDB connected suessfully");
    })
    .catch((error) => {
      console.error("MongoDB connecttion error:", error);
    });
}
app.listen(PORT, ()=>{
    console.log("Server Running on http://localhost:"+ PORT)
})