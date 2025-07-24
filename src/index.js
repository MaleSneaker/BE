import express from "express";
import mongoose from "mongoose";
import router from "./routes/index.js";
import cors from "cors";
import errorHandle from "./middlewares/errorMiddleware.js";
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api", router);

app.use(errorHandle);
mongoose
  .connect("mongodb://127.0.0.1:27017/DATN_PHUCNTPH38869")
  .then(() => {
    console.log("Connected Database");
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  });
