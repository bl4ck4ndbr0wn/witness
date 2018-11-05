import React from "react";

import Claim from "./Claim/Claim";

const Claims = ({ claims }) =>
  claims.map(claim => <Claim claim={claim} key={JSON.stringify(claim._id)} />);

export default Claims;
