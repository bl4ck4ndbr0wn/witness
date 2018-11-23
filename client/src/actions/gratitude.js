import { Api, JsonRpc, RpcError, JsSignatureProvider } from "eosjs";
import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs2";
import Eos from "eosjs";

export const gratitude = data => {
  console.log("Starts gratitude....");
  // Declare the type (EOS)
  ScatterJS.plugins(new ScatterEOS());
  const network = {
    blockchain: "eos",
    protocol: "https",
    host: "api-kylin.eosasia.one",
    port: 443,
    chainId: "5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191"
  };
  ScatterJS.scatter.connect("eosiowitness").then(connected => {
    // User does not have Scatter Desktop, Mobile or Classic installed.
    if (!connected) return false;

    const scatter = ScatterJS.scatter;

    // Declare your required fields here.
    const requiredFields = {
      accounts: [network]
    };
    scatter
      .getIdentity(requiredFields)
      .then(() => {
        const account = scatter.identity.accounts.find(
          x => x.blockchain === "eos"
        );

        console.log(account); // Prints out the account details on the scatter instance, i.e {name: "greenunicorn", authority: "active", publicKey: "EOS5MqPqNJugnbZsHB7pJrFvNuNNrh38KZwNfdtPTgPyEiSCtMBsU", blockchain: "eos"}

        const transactionOptions = {
          authorization: [`${account.name}@${account.authority}`]
        }; // Permission Level

        // Save the scatter instance to state or whatever,
        // Redux
        // dispatch(setScatter(ScatterJS.scatter));

        process(scatter, network, data);

        console.log("finished");
      })
      .catch(error => {
        console.log("Errors here = " + error);
      });

    // Null out the scatter reference to prevent other plugins trying to call a valid scatter instance on the user's browser.
    window.ScatterJS = null;
  });
};

const process = function(scatter, network, data) {
  console.log("Heading there");
  const rpc = new JsonRpc("https://api-kylin.eosasia.one:443", { fetch });
  const api = new Api({
    rpc,
    signatureProvider: scatter.eosHook(network)
  });

  const dataFiles = {
    from: scatter.identity.accounts[0].name,
    memo: "Thanks for your response",
    quantity: "1.000 EOS",
    to: "samooopeters"
  };

  execute(api, scatter, dataFiles);
};

const execute = async (api, scatter, dataFiles) => {
  console.log("claiming");
  try {
    const result = await api.transact(
      {
        actions: [
          {
            account: "eosio.token",
            name: "transfer",
            authorization: [
              {
                actor: scatter.identity.accounts[0].name,
                permission: scatter.identity.accounts[0].authority
              }
            ],
            data: dataFiles
          }
        ]
      },
      {
        blocksBehind: 3,
        expireSeconds: 30
      }
    );
    console.dir(result);
  } catch (e) {
    console.log("\nCaught exception: " + e);
    if (e instanceof RpcError) console.log(JSON.stringify(e.json, null, 2));
  }

  // Redirect to login
  // window.location.href = "/";
};
