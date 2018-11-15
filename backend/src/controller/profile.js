import { Profile } from "../models";
import Validator from "validator";

import isEmpty from "../validation/is-empty";

const getAll = async (req, res) => {
  try {
    const profileConfimed = await Profile.find({
      profileConfirmed: true
    }).exec();
    res.send(profileConfimed);
  } catch (err) {
    res.status(404).json({ profile: "There are no profiles" });
  }
};

const getByuser = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user }).exec();
    if (!profile) {
      errors.noprofile = "There is no profile for this user";
      res.status(404).json(errors);
    }

    res.send(profile);
  } catch (err) {
    res.status(404).json(err);
  }
};

const profilePhoto = async (req, res) => {
  try {
    Profile.findOneAndUpdate(
      { user: req.params.user },
      { $set: { avatar: req.files[0].path } },
      { new: true }
    ).then(profile => res.json(profile));
  } catch (err) {
    res.status(404).json(err);
  }
};

const createProfile = (req, res) => {
  let errors = {};

  req.body.user = !isEmpty(req.body.user) ? req.body.user : "";

  if (!Validator.isLength(req.body.user, { min: 2, max: 14 })) {
    errors.user = "User needs to between 2 and 4 characters";
  }
  if (Validator.isEmpty(req.body.user)) {
    errors.user = "Profile handle is required";
  }

  if (!isEmpty(errors)) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields
  const profileFields = {};
  profileFields.user = req.body.user;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.avatar) profileFields.avatar = req.body.avatar;

  // Social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  profileFields.profileConfirmed = true;

  Profile.findOne({ user: profileFields.user }).then(profile => {
    if (profile) {
      // Update
      Profile.findOneAndUpdate(
        { user: profileFields.user },
        { $set: profileFields },
        { new: true }
      ).then(profile => res.json(profile));
    } else {
      // Create

      // Check if user exists
      Profile.findOne({ user: profileFields.user }).then(profile => {
        if (profile) {
          errors.user = "That user already exists";
          res.status(400).json(errors);
        }

        // Save Profile
        new Profile(profileFields).save().then(profile => res.json(profile));
      });
    }
  });
};

export { getAll, getByuser, createProfile, profilePhoto };
