#include <eosiolib/eosio.hpp>

using namespace eosio;
using namespace std;  // Be concise!!!

class [[eosio::contract]] witness : public eosio::contract {

public:
  using contract::contract;
  
  witness(name receiver, name code,  datastream<const char*> ds): contract(receiver, code, ds) {}

  [[eosio::action]]
  void claim(name claimant, string claim, string category, vector<name> witnesses) {
    require_auth( claimant );

    claims_index claims(_code, _code.value);
     claims.emplace(claimant, [&]( auto& row ) {
         // TODO  - emplace
      });
    
  }

  [[eosio::action]]
  void attest(name attestor, uint64_t claim_id, uint64_t confidence_level, string anecdote) {
    require_auth(attestor);
    // TODO - emplace
  }

  [[eosio::action]]
  void proof(name claimant, uint64_t claim_id, string ipfs_path){
    // TODO - emplace
  }
private:
  
  struct [[eosio::table("claims")]] claim {
    uint64_t id;
    name claimant;
    string claim;
    string category;
    vector<name> witnesses;
    uint64_t primary_key() const { return id; }
  };
  typedef eosio::multi_index<"claims"_n, claim> claims_index;

  struct [[eosio::table("attestations")]] attestation{
      uint64_t id;
      uint64_t claim_id;
      uint64_t confidence_level;
      string anecdote;

      uint64_t primary_key() const { return id ;}
      uint64_t by_claim_id() const {return claim_id; }

  };
  typedef eosio::multi_index<"attestations"_n, attestation, eosio::indexed_by<"claim_id"_n, eosio::const_mem_fun<attestation, uint64_t, &attestation::by_claim_id>>> attestations_index;
  
   struct [[eosio::table("proofs")]] proof{
      uint64_t id;
      uint64_t claim_id;
      string ipfs_path;

      uint64_t primary_key() const { return id ;}
      uint64_t by_claim_id() const {return claim_id; }
  };
  typedef eosio::multi_index<"proofs"_n, proof, eosio::indexed_by<"claim_id"_n, eosio::const_mem_fun<proof, uint64_t, &proof::by_claim_id>>> proofs_index;

};

EOSIO_DISPATCH( witness, (claim)(attest)(proof) )    
