import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import demux from "./services/demux";
import io from "./utils/io";

import profile from "./routes/profile";

let app = express();

app.use(cors());
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/v1/witness/profile", profile());

const server = app.listen(process.env.PORT, () =>
  console.info(`Witness.io dapp listening on port ${process.env.PORT}!`)
);

io.connect(server);

demux.watch();
