import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

// Index Route
import routes from "./routes/index.js";

// For connecting to MongoDB
import { connectToDB } from "../connection/connection.js";
import configResponse from "./config.js";
import { rateLimit } from "express-rate-limit";
import { sendRes } from "./helpers/sendRes.helper.js";

// To use env variables
config();

const app = express();
const port = process.env.PORT;

await connectToDB();

//MiddleWares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);
app.use(
  rateLimit({
    max: 100,
    windowMs: 15 * 60 * 1000,
    message: "Too many request from this IP",
  })
);

// ROOT Endpoint
app.get("/", function (req, res) {
  res.send({ msg: "Notes Backend" });
});

//EndPoints
app.use("/api/v1/", routes);

//404 Routes
app.use((req, res) => {
  sendRes(
    res,
    404,
    false,
    `${configResponse.messages.ROUTE_NOT_FOUND + " " + req.originalUrl}`
  );
});

// SERVER RUNNING CODE
app.listen(port || 8000, () => {
  console.log(`Server is running on port: ${port}`);
});
