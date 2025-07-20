import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("Connected!"))
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server dang chay o cong ${PORT}`);
    });
  });
