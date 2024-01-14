import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
dotenv.config();
const app = express();
// this called as middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookieParser
app.use(cookieParser());

app.use("/api", userRoutes);
app.use("/api", postRoutes);

app.get("/", (req, res) => {
  res.send("Hi From prismaDB");
});

app.listen(8000, () => {
  console.log("server is running");
});
