import { Api, JsonRpc, RpcError, JsSignatureProvider } from "eosjs";
import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs2";

const claim = function(event) {
  event.preventDefault();
  // Declare the type (EOS)
  ScatterJS.plugins(new ScatterEOS());
  const network = {
    blockchain: "eos",
    protocol: "https",
    host: "api-kylin.eosasia.one",
    port: 443,
    chainId: "5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191"
  };
  ScatterJS.scatter.connect("witness").then(connected => {
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

        process(scatter, network);

        console.log("finished");
      })
      .catch(error => {
        console.log("Errors here = " + error);
      });

    // Null out the scatter reference to prevent other plugins trying to call a valid scatter instance on the user's browser.
    window.ScatterJS = null;
  });
};

const process = function(scatter, network) {
  console.log("Heading there");
  const rpc = new JsonRpc("https://api-kylin.eosasia.one:443", { fetch });
  console.log(scatter);
  const api = new Api({
    rpc,
    signatureProvider: scatter.eosHook(network)
  });

  const data = {
    claimant: scatter.identity.accounts[0].name,
    content: "Hello there",
    category: "Education",
    witnesses: ["alphangangaa"]
  };
  execute(api, scatter, "claim", data);
};

const execute = async (api, scatter, action_name, data) => {
  console.log("claiming");
  try {
    const actorName = scatter.identity.accounts[0].name;
    const actorAuthority = scatter.identity.accounts[0].authority;
    const result = await api.transact(
      {
        actions: [
          {
            account: "witnessaccnt",
            name: action_name,
            authorization: [
              {
                actor: actorName,
                permission: actorAuthority
              }
            ],
            data: data
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
};

export default claim;