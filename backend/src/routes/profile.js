import { Router } from "express";
import {
  currentUser,
  getAll,
  getByHandle,
  createProfile
} from "../controller/profile";

export default () => {
  let api = Router();

  api.get("/all", getAll);
  api.get("/handle/:handle", getByHandle);
  api.post("/", createProfile);

  return api;
};
