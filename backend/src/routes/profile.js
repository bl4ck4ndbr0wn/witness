import { Router } from "express";
import multer from "multer";
import {
  followProfile,
  unfollowProfile,
  getAll,
  getByuser,
  createProfile,
  profilePhoto,
  allFollowers
} from "../controller/profile";

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./src/uploads");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname.replace(/\s/g, ""));
  }
});

const fileFilter = (req, file, cb) => {
  // rejest a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/msword" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    let errors = {
      fileupload: "Only Jpeg or png are allowed."
    };

    cb(new Error(errors), false);
  }
};

const upload = multer({ storage: storage });

export default () => {
  let api = Router();

  api.get("/all", getAll);
  api.get("/user/:user", getByuser);
  api.get("/followers/:id", allFollowers);
  api.post("/", createProfile);
  api.post("/photo/:user", upload.any("fileupload"), profilePhoto);
  api.post("/follow/:user_id/:user", followProfile);
  api.post("/unfollow/:user_id/:user", unfollowProfile);

  return api;
};
