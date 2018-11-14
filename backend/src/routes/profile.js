import { Router } from "express";
import {
  currentUser,
  getAll,
  getByuser,
  createProfile
} from "../controller/profile";

export default () => {
  let api = Router();

  api.get("/all", getAll);
  api.get("/user/:user", getByuser);
  api.post("/", createProfile);

  return api;
};
