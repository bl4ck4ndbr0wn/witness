const { Claim, Profile } = require("../models");

const getAll = async (req, res) => {
  try {
    Claim.find({ claimConfirmed: true })
      .sort({ created_on: -1 })
      .then(claim => {
        if (!claim) {
          errors.noclaim = "There is no claim for this user";
          res.status(404).json(errors);
        }

        res.send(claim);
      });
  } catch (err) {
    res.status(404).json({ profile: "There are no Claims" });
  }
};

const getByuser = async (req, res) => {
  try {
    const claim = await Claim.find({ user: req.params.user_id }).exec();
    if (!claim) {
      errors.noclaim = "There is no claim for this user";
      res.status(404).json(errors);
    }

    res.send(claim);
  } catch (err) {
    res.status(404).json(err);
  }
};

const followingClaims = async (req, res) => {
  Profile.findOne({ user: req.params.user }).then(profile => {
    const newClaimList = [];
    profile.folowers.forEach(folower => {
      Claim.find({ user: folower._id }).then(claims => {
        Array.prototype.push.apply(newClaimList, claims);
        res.json(newClaimList);
      });
    });
    console.log(newClaimList);
  });
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
    res.status(404).json(err);
  }
};

const reviewClaim = async (req, res) => {
  try {
    Claim.findOne({
      _id: {
        timestamp: req.body.timestamp,
        user: req.body.user
      }
    }).then(claim => {
      if (!claim) {
        errors.user = "Claim does not exists to review";
        res.status(400).json(errors);
      }
      Profile.findOne({
        user: req.body.reviewer
      }).then(profile => {
        let newReview = {
          _id: {
            timestamp: req.body.timestamp,
            user: req.body.user
          },
          user: req.body.reviewer,
          avatar: profile.avatar,
          review: req.body.review,
          rating: req.body.rating,
          ipfs_path: req.body.ipfs_path,
          reviewConfirmed: true
        };

        claim.reviews.unshift(newReview);

        claim.save().then(claim => res.json(claim));
      });
    });
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports = {
  getAll,
  createClaim,
  getByuser,
  reviewClaim,
  followingClaims
};
