import { Profile } from "../models";

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

const getByHandle = async (req, res) => {
  try {
    const profile = await Profile.findOne({ handle: req.params.handle }).exec();
    if (!profile) {
      errors.noprofile = "There is no profile for this user";
      res.status(404).json(errors);
    }

    res.send(profile);
  } catch (err) {
    res.status(404).json(err);
  }
};

const createProfile = (req, res) => {
  // Get fields
  const profileFields = {};
  profileFields.handle = req.body.handle;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.avatar) profileFields.avatar = req.body.avatar;

  // Skills - Spilt into array
  if (typeof req.body.skills !== "undefined") {
    profileFields.skills = req.body.skills.split(",");
  }

  // Social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  profileFields.profileConfirmed = req.body.profileConfirmed;

  Profile.findOne({ handle: profileFields.handle }).then(profile => {
    if (profile) {
      // Update
      Profile.findOneAndUpdate(
        { handle: profileFields.handle },
        { $set: profileFields },
        { new: true }
      ).then(profile => res.json(profile));
    } else {
      // Create

      // Check if handle exists
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          errors.handle = "That handle already exists";
          res.status(400).json(errors);
        }

        // Save Profile
        new Profile(profileFields).save().then(profile => res.json(profile));
      });
    }
  });
};

export { getAll, getByHandle, createProfile };
