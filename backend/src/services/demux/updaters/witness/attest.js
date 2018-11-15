async function attest(state, payload, blockInfo, context) {
  const Claim = state.claim;
  const Profile = state.profile;
  console.log(payload.data);
  try {
    let profile = await Profile.findOne({
      user: payload.data.user
    }).exec();

    const claim = await Claim.findById({
      timestamp: payload.data.timestamp,
      user: payload.data.user
    }).exec();

    const newreview = {
      _id: {
        timestamp: payload.data.timestamp,
        user: payload.data.user
      },
      user: profile._id,
      review: payload.data.review,
      rating: payload.data.rating,
      ipfs_path: payload.data.ipfs_path,
      reviewConfirmed: true
    };

    // Add to reviews array
    claim.reviews.unshift(newreview);

    await claim.save();
  } catch (err) {
    console.error(err);
  }
}

export default attest;
