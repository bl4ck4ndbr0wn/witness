import { Claim, Profile } from "../models";

const getAll = async (req, res) => {
  try {
    const claimConfimed = await Claim.find({
      claimConfirmed: true
    }).exec();
    res.send(claimConfimed);
  } catch (err) {
    res.status(404).json({ profile: "There are no Claims" });
  }
};

const getByuser = async (req, res) => {
  try {
    const claim = await Claim.findOne({ user: req.params.user_id }).exec();
    if (!claim) {
      errors.noclaim = "There is no claim for this user";
      res.status(404).json(errors);
    }

    res.send(claim);
  } catch (err) {
    res.status(404).json(err);
  }
};

const createClaim = (req, res) => {
  try {
    Claim.findOne({
      _id: {
        timestamp: req.body.timestamp,
        user: req.body.user
      }
    }).then(claim => {
      if (claim) {
        //update
        Claim.findByIdAndUpdate(
          { timestamp: req.body.timestamp, user: req.body.user },
          req.body
        ).then(claim => res.json(claim));
      }

      Profile.findOne({
        user: req.body.user
      }).then(profile => {
        let newClaim = {
          _id: {
            timestamp: req.body.timestamp,
            user: req.body.user
          },
          user: profile._id,
          category: req.body.category,
          content: req.body.content,
          ipfs_path: req.body.ipfs_path,
          witnesses: req.body.witnesses,
          claimConfirmed: true
        };

        new Claim(newClaim).save().then(claim => res.json(claim));
      });
    });
  } catch (err) {
    err => res.status(404).json(err);
  }
};

export { getAll, createClaim, getByuser };
