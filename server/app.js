import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./api/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";

// appending environment variables to process.env
dotenv.config();
const port = process.env.PORT || 3300;
const app = express();

// middlewares to add cors policys
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: false,
  })
);
// add neccessary headers
app.use(helmet());

// parse incoming request with json payload
app.use(express.json());


// Routes
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Server Running!");
});

// 404 routes middleware
app.use(notFoundHandler);

// Error handler middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening to ${port}`);
});
