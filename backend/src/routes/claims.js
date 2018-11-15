import { Router } from "express";
import { getAll, createClaim, getByuser } from "../controller/claims";

export default () => {
  let api = Router();

  api.get("/all", getAll);
  api.post("/claim", createClaim);
  api.get("/:user_id", getByuser);

  return api;
};
