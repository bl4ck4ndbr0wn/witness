import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import demux from "./services/demux";
import io from "./utils/io";

import profile from "./routes/profile";
import claims from "./routes/claims";

let app = express();

app.use(cors());
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add headers
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "*");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// File uploads
app.use("/src/uploads", express.static("src/uploads"));

app.use("/api/v1/profile", profile());
app.use("/api/v1/claims", claims());

const server = app.listen(process.env.PORT, () =>
  console.info(`Witness.io dapp listening on port ${process.env.PORT}!`)
);

io.connect(server);

// demux.watch();
