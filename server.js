import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routers/router.js";

const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
