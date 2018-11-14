import { Api, JsonRpc, RpcError, JsSignatureProvider } from "eosjs";
const fetch = require("node-fetch"); // node only; not needed in browsers
const { TextDecoder, TextEncoder } = require("text-encoding"); // IE11 and IE Edge Browsers only

export default class EOSIOClient {
  constructor(contractAccount) {
    const rpc = new JsonRpc(process.env.REACT_APP_EOSIO_HTTP_URL, { fetch });
    const signatureProvider = new JsSignatureProvider([
      process.env.REACT_APP_EOSIO_PRIVATE_KEY
    ]);
    this.contractAccount = contractAccount;
    this.eos = new Api({
      rpc,
      signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder()
    });
  }

  transaction = (actor, action, data) => {
    return this.eos.transact(
      {
        actions: [
          {
            account: this.contractAccount,
            name: action,
            authorization: [
              {
                actor,
                permission: "active"
              }
            ],
            data: {
              ...data
            }
          }
        ]
      },
      {
        blocksBehind: 3,
        expireSeconds: 30
      }
    );
  };
}
