#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>

using namespace eosio;
using namespace std; // Be concise!!!

class[[eosio::contract]] witness : public eosio::contract
{

  public:
    using contract::contract;

    witness(name receiver, name code, datastream<const char *> ds) : contract(receiver, code, ds), _claimst(receiver, code.value), _attestationst(receiver, code.value), _proofst(receiver, code.value){}

                                                                                                                                                                             [[eosio::action]] void
                                                                                                                                                                             claim(name claimant, string content, string category, vector<name> witnesses)
    {
        require_auth(claimant);

        _claimst.emplace(claimant, [&](auto &claim) {
            claim.id = _claimst.available_primary_key();
            claim.claimant = claimant;
            claim.claim = content;
            claim.category = category;
            claim.witnesses = witnesses;

            // TODO - require_recipient each witness? Notify?
        });
    }

    [[eosio::action]] void attest(name attestor, uint64_t claimId, uint64_t confidence_level, string anecdote) {
        require_auth(attestor);
        _attestationst.emplace(attestor, [&](auto &attestation) {
            attestation.id = _attestationst.available_primary_key();
            attestation.claimobj = claimId;
            attestation.confidence_level = confidence_level;
            attestation.anecdote = anecdote;

            // TODO - require_recipient claim.claimant? Appreciate witness (Transfer)?
        });
    }

        [[eosio::action]] void
        proof(name claimant, uint64_t claimId, string description, string ipfs_path)
    {
        require_auth(claimant);
        auto iterator = _claimst.find(claimId);
        eosio_assert(iterator != _claimst.end(), "Record does not exist");
        _proofst.emplace(claimant, [&](auto &proof) {
            proof.id = _proofst.available_primary_key();
            proof.claimobj = claimId;
            proof.description = description;
            proof.ipfs_path = ipfs_path;
        });
    }

  private:
    struct [[eosio::table("claims")]] claimobj
    {
        uint64_t id;
        name claimant;
        string claim;
        string category;
        vector<name> witnesses;
        uint64_t primary_key() const { return id; }
    };
    typedef eosio::multi_index<"claims"_n, claimobj> claims_index;

    struct [[eosio::table("attestations")]] attestation
    {
        uint64_t id;
        uint64_t claimobj;
        uint64_t confidence_level;
        string anecdote;

        uint64_t primary_key() const { return id; }
    };
    typedef eosio::multi_index<"attestations"_n, attestation> attestations_index;

    struct [[eosio::table("proofs")]] proofobj
    {
        uint64_t id;
        uint64_t claimobj;
        string description;
        string ipfs_path;

        uint64_t primary_key() const { return id; }
    };
    typedef eosio::multi_index<"proofs"_n, proofobj> proofs_index;

    claims_index _claimst;
    attestations_index _attestationst;
    proofs_index _proofst;
};

EOSIO_DISPATCH(witness, (claim)(attest)(proof))
