"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
    } else if (payload.data.category === "Skills") {
      profile.skills.unshift(newClaim);
      await profile.save();
    }
  } catch (err) {
    console.error(err);
  }
}

var _default = createClaim;
exports.default = _default;
//# sourceMappingURL=claim.js.map