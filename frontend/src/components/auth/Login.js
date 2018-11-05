import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs2";

const Login = function(event) {
  event.preventDefault();
  // Declare your network. For local, substitute with the appropriate values below. Dont forget the chain ID!
  const network = {
    blockchain: "eos",
    protocol: "http",
    host: "127.0.0,1",
    port: 8888,
    chainId: "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f"
  };

  // Declare the type (EOS)
  ScatterJS.plugins(new ScatterEOS());

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

        // Save the scatter instance to state or whatever,
        // Redux
        // dispatch(setScatter(ScatterJS.scatter));
      })
      .catch(error => {
        // The user rejected this request, or doesn't have the appropriate requirements.
        console.error(error);
      });

    // Null out the scatter reference to prevent other plugins trying to call a valid scatter instance on the user's browser.
    window.ScatterJS = null;
  });
};

export default Login;
