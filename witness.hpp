#pragma once

#include <algorithm>
#include <string>
#include <vector>
#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>

using eosio::const_mem_fun;
using eosio::name;
using std::string;
using namespace std;

class witness : public eosio::contract
{
  public:
    witness(account_name self)
        : eosio::contract(self)
    {
    }

    // @abi
    void claim(
        // Params here

        /*
            The Clam is what the Claimant projects to the network and consequently to the 
            Witnesses (Account names that shall vouch for the validity of this Claim) for approval.
            For example, 'I am a Proficient C++ Programmer', 'I am a skilled HR Manager with a 20 Year Experience'.
            This Claim is sent out to a list of Witnesses who may Attest to this.
        */
        const account_name claimant,
        const string &claim,
        vector<account_name> witnesses,
        const string claim_id

    );

    // @abi
    void proof(
        // Params here

        /*
            The Claimant may be obliged to present a PROOF of their
            claim. This may be a File (Certificate, Image, Etc), stored on IPFS (Preferrably).
            The Witnesses may Vouch for the validity of the PROOF.
        */
        const account_name claimant,
        const string &file_path,
        const string &title,
        const string &claim_id,
        const string &file_hash);

    // @abi
    void attest(
        // Params here

        /* 
            The Witness shall then ATTEST of the Claimant's Claim
            We expect the Witness account, the claimant account, the claim ID,
            Any metadata (Valid JSON), the Attestation text and an Integer for Confidence Level
        */
        const account_name witness,
        const account_name claimant,
        const string &claim_id,
        const string &metadata,
        const string &attestation,
        const string &confidence_level
        // const bool proofed
    );

   
};
