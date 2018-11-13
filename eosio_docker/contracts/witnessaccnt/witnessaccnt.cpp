#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>

using namespace eosio;
using namespace std; // Be concise!!!

class[[eosio::contract]] witnessaccnt : public eosio::contract
{

  public:
    using contract::contract;

    witnessaccnt(name receiver, name code, datastream<const char *> ds) : contract(receiver, code, ds), _claimst(receiver, code.value), _attestationst(receiver, code.value), _proofst(receiver, code.value){}

                                                                                                                                                                                  [[eosio::action]] void
                                                                                                                                                                                  claim(name user, uint64_t timestamp, string content, string category, vector<name> witnesses)
    {
        require_auth(user);

        uint128_t skey = static_cast<uint128_t>(user.value) << 64 | timestamp;
        // Save article to table. Charge the get_self() , i.e. this contract for the resources used.
        _claimst.emplace(user, [&](auto &claim) {
            claim.id = _claimst.available_primary_key();
            claim.skey = skey;
            claim.user = user;
            claim.claim = content;
            claim.category = category;
            claim.witnesses = witnesses;
        });
    }

    [[eosio::action]] void attest(uint64_t timestamp, name attestor, uint64_t confidence_level, string review) {
        require_auth(attestor);

        // Above works but lets get fancy now. Index by secondary key :-)
        auto claim_index = _articles.get_index<name("getbyskey")>();
        uint128_t skey = static_cast<uint128_t>(attestor.value) << 64 | timestamp;
        auto article = claim_index.find(skey);
        eosio_assert(article != claim_index.end(), "Article could not be found");

        _attestationst.emplace(attestor, [&](auto &attestation) {
            attestation.id = _attestationst.available_primary_key();
            attestation.claimobj = claimId;
            attestation.confidence_level = confidence_level;
            attestation.review = review;

            // TODO - require_recipient claim.user? Appreciate witness (Transfer)?
        });
    }

        [[eosio::action]] void
        proof(name user, uint64_t claimId, string description, string ipfs_path)
    {
        require_auth(user);
        auto iterator = _claimst.find(claimId);
        eosio_assert(iterator != _claimst.end(), "Record does not exist");
        _proofst.emplace(user, [&](auto &proof) {
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
        name user;
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

EOSIO_DISPATCH(witnessaccnt, (claim)(attest)(proof))
