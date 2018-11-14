"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _demux = require("demux");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _models = require("../../models");

var _io = _interopRequireDefault(require("../../utils/io"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ActionHandler extends _demux.AbstractActionHandler {
  constructor(updaters, effects, uri) {
    _mongoose.default.connect(uri, {
      useNewUrlParser: true
    }); // CONNECTION EVENTS
    // Connection successful


    _mongoose.default.connection.on("connected", () => {
      console.info(`Mongoose default connection open to ${uri}`);
    }); // Connection throws an error


    _mongoose.default.connection.on("error", console.error.bind(console, "Mongoose default connection error:")); // Connection is disconnected


    _mongoose.default.connection.on("disconnected", () => {
      console.info("Mongoose default connection disconnected");
    }); // Close the connection if the node process is terminated


    process.on("SIGINT", () => {
      _mongoose.default.connection.close(() => {
        console.info("Mongoose default connection disconnected through app termination");
        process.exit(0);
      });
    });
    super(updaters, effects);
  }

  async handleWithState(handle) {
    const context = {
      socket: _io.default.getSocket()
    };
    const state = {
      user: _models.User,
      profile: _models.Profile,
      blockIndexState: _models.BlockIndexState
    };

    try {
      await handle(state, context);
    } catch (err) {
      console.error(err);
    }
  }

  async updateIndexState(state, block, isReplay) {
    const {
      blockInfo
    } = block;

    try {
      await state.blockIndexState.update({}, {
        blockNumber: blockInfo.blockNumber,
        blockHash: blockInfo.blockHash,
        isReplay
      }, {
        upsert: true
      }).exec();
    } catch (err) {
      console.error(err);
    }
  }

  async loadIndexState() {
    try {
      let blockHash;
      let blockNumber;
      const indexState = await _models.BlockIndexState.findOne({}).exec();

      if (indexState) {
        ({
          blockHash,
          blockNumber
        } = indexState);
      }

      if (blockNumber && blockHash) {
        return {
          blockNumber,
          blockHash
        };
      }

      return {
        blockNumber: 0,
        blockHash: ""
      };
    } catch (err) {
      console.error(err);
    }
  }

}

var _default = ActionHandler;
exports.default = _default;
//# sourceMappingURL=ActionHandler.js.map