#!/usr/bin/env bash
set -o errexit

echo "=== setup blockchain accounts and smart contract ==="

# Sleep for 2 to allow time 4 blocks to be created so we have blocks to reference when sending transactions
sleep 2s
echo "=== setup wallet: eosiomain ==="
# First key import is for eosio system account
cleos  wallet create -n eosiomain --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > eosiomain_wallet_password.txt
cleos  wallet import -n eosiomain --private-key 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3

echo "=== setup wallet: witnesswallet ==="
# key for eosio account and export the generated password to a file for unlocking wallet later
cleos  wallet create -n witnesswallet --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > witness_wallet_password.txt
# Owner key for witnesswallet wallet
cleos  wallet import -n witnesswallet --private-key 5JpWT4ehouB2FF9aCfdfnZ5AwbQbTtHBAwebRXt94FmjyhXwL4K
# Active key for witnesswallet wallet
cleos  wallet import -n witnesswallet --private-key 5JD9AGTuTeD5BXZwGQ5AtwBqHK21aHmYnTetHgk1B3pjj7krT8N



echo "=== deploy smart contract ==="
# $1 smart contract name
# $2 account holder name of the smart contract
# $3 wallet that holds the keys for the account
# $4 password for unlocking the wallet
deploy_contract.sh witness witnessaccnt witnesswallet $(cat witness_wallet_password.txt)

# put the background nodeos job to foreground for docker run
fg %1
