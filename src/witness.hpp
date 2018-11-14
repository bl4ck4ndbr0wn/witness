#include <eosiolib/eosio.hpp>
#include <eosiolib/time.hpp>
#include <eosiolib/print.hpp>

CONTRACT witness : public eosio::contract
{
    using contract::contract;

  public:
    witness(eosio::name self, eosio::name code, eosio::datastream<const char *> stream) : contract(self, code, stream), _claims(self, self.value), _attestations(self, self.value) {}

    ACTION claim(const eosio::name &user, const uint64_t &timestamp, const std::string category, std::string content, std::string ipfs_path, const std::vector<eosio::name> &witnesses);

    ACTION attest(const uint64_t &timestamp, const eosio::name &user, const eosio::name &reviewer, const std::string &review, std::string ipfs_path);

    TABLE claimstruct
    {
        uint64_t id;
        uint128_t key;
        eosio::name user;
        uint64_t timestamp;
        std::string category;
        std::string content;
        std::string ipfs_path;
        std::vector<eosio::name> witnesses;

        uint128_t by_key() const { return key; }
        uint64_t primary_key() const { return id; }
    };

    typedef eosio::multi_index<eosio::name("claims"), claimstruct,
                               eosio::indexed_by<eosio::name("bykey"), eosio::const_mem_fun<claimstruct, uint128_t, &claimstruct::by_key>>>
        claims_table;

    TABLE attestation
    {
        uint64_t id;
        uint128_t key;
        uint64_t timestamp;
        eosio::name user;
        eosio::name reviewer;
        std::string review;
        std::string ipfs_path;

        uint64_t primary_key() const { return id; }
        uint128_t by_key() const { return key; }
    };

    typedef eosio::multi_index<eosio::name("attestations"), attestation,
                               eosio::indexed_by<eosio::name("bykey"), eosio::const_mem_fun<attestation, uint128_t, &attestation::by_key>>>
        attestations_table;

  private:
    claims_table _claims;
    attestations_table _attestations;
};