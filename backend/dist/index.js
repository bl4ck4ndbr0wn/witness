"use strict";

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _demux = _interopRequireDefault(require("./services/demux"));

var _io = _interopRequireDefault(require("./utils/io"));

var _profile = _interopRequireDefault(require("./routes/profile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let app = (0, _express.default)();
app.use((0, _cors.default)()); // Body parser middleware

app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
app.use("/v1/witness/profile", (0, _profile.default)()); // Server static assets if in production

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(_express.default.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const server = app.listen(process.env.PORT, () => console.info(`Witness.io dapp listening on port ${process.env.PORT}!`));

_io.default.connect(server);

_demux.default.watch();
//# sourceMappingURL=index.js.map