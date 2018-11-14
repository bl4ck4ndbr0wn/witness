async function createClaim(state, payload, blockInfo, context) {
  const Profile = state.profile;
  const Claim = state.claim;
  try {
    let profile = await Profile.findOne({
      user: payload.data.user
    }).exec();

    let claim = await Claim.find({
      _id: {
        timestamp: payload.data.timestamp,
        user: payload.data.user
      }
    }).exec();

    let newClaim = {
      _id: {
        timestamp: payload.data.timestamp,
        user: payload.data.user
      },
      user: profile._id,
      category: payload.data.category,
      content: payload.data.content,
      ipfs_path: payload.data.ipfs_path,
      witnesses: payload.data.witnesses,
      claimConfirmed: true
    };

    // if claim already exists do not insert it in again
    if (claim.length !== 0)
      await claim
        .findByIdAndUpdate(
          { timestamp: payload.data.timestamp, user: payload.data.user },
          payload.data
        )
        .exec();

    claim = new claim(newClaim);

    await claim.save();
  } catch (err) {
    console.error(err);
  }
}

export default createClaim;
