// Update the edited claim od add claim to claims if new claim
export const updateClaimForCreateAndEdit = (prevState, updatedClaim) => {
  let alreadyAdded = false;
  let updatedClaims = prevState.claims.map(claim => {
    if (claim._id === updatedClaim.claim_id) {
      alreadyAdded = true;
      return {
        ...claim,
        ...updatedClaim
      };
    }
    return claim;
  });

  if (!alreadyAdded) {
    updatedClaims = [{ ...updatedClaim }, ...updatedClaims];
  }

  return updatedClaims;
};
