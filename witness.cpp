#include "witness.hpp"
#include <eosiolib/print.hpp>
using namespace eosio;
using namespace std;

EOSIO_ABI(witness, (claim)(proof)(attest)(appreciate))

// @abi action claim
void witness::claim(
    const account_name claimant,
    const string &claim,
    vector<account_name> witnesses,
    const string claim_id)
{
    // Logic Definition here

    /* 
        1. Require Auth of Claimant.
        2. Check if submitted claim is within the required length limits.
            TODO - Establish the Limit length of Claims.
        3. If all goes well, check the existence of each tagged Witness.
        4. Notify the found Witnesses, ignore the non-existent ones.
    */

    // 1. Auth of Claimant
    require_auth(claimant);

    // 2. Sanity Checks on content length
    // 2.a Claim shall not be empty strings
    eosio_assert(claim.size() > 0, "The Claim should not be empty.");

    // 2.b Claim shall not exceed 10KB
    eosio_assert(claim.size() < 1024 * 10, "The Claim is limited to 10KB.");

    // Looking ahead, we may bump into some non-existent witnesses.

    std::vector<account_name> failed;
    std::vector<account_name>::iterator it;

    // 3. Check for existence of all Tagged Witnesses
    for (int i = 0; i < witnesses.size(); i++)
    {

        // Sanity Check : Validate witness accounts
        if (is_account(witnesses[i]))
        {

            //If all went well, we shall notify all of them
            require_recipient(witnesses[i]);
            print(name{witnesses[i]}, " Found", "\n");
        }
        else
        {
            // Push all non-existent witness accounts to the vector failed.
            failed.push_back(name{witnesses[i]});
            print(name{witnesses[i]}, " Not Found", "\n");
        }
    }
    for (it = failed.begin(); it < failed.end(); it++)
    {
        print(name{*it}, " - ", "Not Found At all. ");
    }
}

// @abi action proof
void witness::proof(
    const account_name claimant,
    const string &file_path,
    const string &title,
    const string &claim_id,
    const string &file_hash)
{
    // Logic Here

    // 1. Require Auth for the claimant
    require_auth(claimant);

    // Sanity checks here
    eosio_assert(file_path.size() > 0, "you cannot post a blank IPFS path");
    eosio_assert(title.size() > 0, "specify the title/name of the proof file you have uploaded");
    eosio_assert(claim_id.size() > 0, "each proof needs a claim id associated with it");
    eosio_assert(file_hash.size() > 0, "We expect a hash, senior");
    require_recipient(claimant);
}

// @abi action attest
void witness::attest(
    const account_name witness,
    const account_name claimant,
    const string &claim_id,
    const string &metadata,
    const string &attestation,
    const string &confidence_level
    // const bool proofed
)
{
    // Logic here

    //  Require the auth of the Witness
    require_auth(witness);

    // Check the length
    eosio_assert(attestation.size() > 0, "Attest something, shall you?");
    require_recipient(claimant);
    require_recipient(witness);
}

