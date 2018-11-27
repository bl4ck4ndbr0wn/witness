const { Router } = require("express");
const {
  getAll,
  createClaim,
  getByuser,
  reviewClaim,
  followingClaims
} = require("../controller/claims");

module.exports = () => {
  let api = Router();

  api.get("/all", getAll);
  api.post("/claim", createClaim);
  api.post("/review", reviewClaim);
  api.get("/:user_id", getByuser);
  api.get("/following/:user", followingClaims);

  return api;
};
