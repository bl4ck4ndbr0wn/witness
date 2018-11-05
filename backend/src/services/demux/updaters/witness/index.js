import claim from "./claim";

const account = process.env.EOSIO_CONTRACT_ACCOUNT;

export default [
  {
    actionType: `${account}::claim`, // account::action name
    updater: claim
  }
];
