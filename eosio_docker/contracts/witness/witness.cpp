#include "witness.hpp"

ACTION witness::claim(const eosio::name &user, const uint64_t &timestamp, const std::string category, std::string content, const std::string ipfs_path, const std::vector<eosio::name> &witnesses)
{
    require_auth(user);
    // Constrain content length to 280 chars (Tweet length)
    eosio_assert(content.size() < 280, "claim should not exceed 280 characters");

    // Generate secondary key
    uint128_t key = static_cast<uint128_t>(user.value) << 64 | timestamp;

    _claims.emplace(user, [&](auto &c) {
        c.id = _claims.available_primary_key();
        c.key = key;
        c.user = user;
        c.timestamp = timestamp;
        c.category = category;
        c.content = content;
        c.ipfs_path = ipfs_path;
        c.witnesses = witnesses;
    });
}

ACTION witness::attest(const uint64_t &timestamp, const eosio::name &user, const eosio::name &reviewer, const std::string &review, std::string ipfs_path)
{
    eosio_assert(review.size() < 280, "attestation should not exceed 280 characters");

    auto _attestations_index = _attestations.get_index<eosio::name("bykey")>();

    uint128_t key = static_cast<uint128_t>(user.value) << 64 | timestamp;

    auto rev = _attestations_index.find(key);
    eosio_assert(rev != _attestations_index.end(), "claim not found");
    _attestations.emplace(get_self(), [&](auto &a) {
        a.id = _attestations.available_primary_key();
        a.key = key;
        a.timestamp = timestamp;
        a.user = user;
        a.reviewer = reviewer;
        a.review = review;
        a.ipfs_path = ipfs_path;
    });
}
EOSIO_DISPATCH(witness, (claim)(attest))