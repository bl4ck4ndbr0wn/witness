async function createClaim(state, payload, blockInfo, context) {
  const Profile = state.profile;
  try {
    let profile = await Profile.findOne({
      handle: payload.data.claimant
    }).exec();

    const newClaim = {
      claimant: payload.data.claimant,
      content: payload.data.content,
      witnesses: payload.data.witnesses,
      claimConfirmed: true
    };

    if (payload.data.category === "Education") {
      profile.education.unshift(newClaim);

      await profile.save();
    } else if (payload.data.category === "Experience") {
      profile.experience.unshift(newClaim);

      await profile.save();
    } else if (payload.data.category === "Skill") {
      profile.skill.unshift(newClaim);

      await profile.save();
    }
  } catch (err) {
    console.error(err);
  }
}

export default createClaim;
