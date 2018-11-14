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

app.use("/api/v1/profile", profile());

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const server = app.listen(process.env.PORT, () =>
  console.info(`Witness.io dapp listening on port ${process.env.PORT}!`)
);

io.connect(server);

demux.watch();
