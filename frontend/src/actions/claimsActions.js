import { Api, JsonRpc, RpcError, JsSignatureProvider } from "eosjs";
import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs2";

const claim = function(event) {
  event.preventDefault();
  // Declare the type (EOS)
  ScatterJS.plugins(new ScatterEOS());
  const network = {
    blockchain: "eos",
    protocol: "http",
    host: "127.0.0.1",
    port: 8888,
    chainId: "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f"
  };
  ScatterJS.scatter.connect("witty").then(connected => {
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
  const rpc = new JsonRpc("http://127.0.0.1:8888", { fetch });
  console.log(scatter);
  const api = new Api({
    rpc,
    signatureProvider: scatter.eosHook(network)
  });

  const data = {
    claimant: "claimant",
    content: "Hello there",
    category: "Education"
  };
  execute(api, scatter, "claim", data);
};

const execute = function(api, scatter, action_name, data) {
  console.log("claiming");
  try {
    const actorName = scatter.identity.accounts[0].name;
    const actorAuthority = scatter.identity.accounts[0].authority;
    (async () => {
      const result = await api.transact(
        {
          actions: [
            {
              account: "witnessio",
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
    })();
  } catch (e) {
    console.log("\nCaught exception: " + e);
    if (e instanceof RpcError) console.log(JSON.stringify(e.json, null, 2));
  }
};

export default claim;
