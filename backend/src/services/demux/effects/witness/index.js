import claim from "./claim";
import attest from "./attest";

const account = process.env.EOSIO_CONTRACT_ACCOUNT;

export default [
  {
    actionType: `${account}::claim`, // account::action name
    effect: claim
  },
  {
    actionType: `${account}::attest`,
    effect: attest
  }
];
