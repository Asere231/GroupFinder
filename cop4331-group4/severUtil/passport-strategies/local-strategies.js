const passport = require("passport");
const { Strategy } = require("passport-local");
const { User } = require("../mongooseSchemas/schemas.js");
const { comparePassword } = require("../util/passwordEncryption.js");

const localStrategy = new Strategy(async (username, password, done) => {
  try {
    let foundUser = await User.findOne({ username: username });

    if (!foundUser) throw new Error("User not found");

    if (!comparePassword(password, foundUser.password))
      throw new Error("Password don't match");

    done(null, foundUser);
  } catch (err) {
    done(err, null);
  }
});

passport.serializeUser(async (user, done) => {
  console.log(`Inside Serialize User:`);
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log(`Inside Deserialize User:`);
  console.log(`User id: ${id}`);

  try {
    let foundUser = await User.findById(id);

    if (!foundUser) throw new Error("User not found");

    done(null, foundUser);
  } catch (err) {
    done(err, null);
  }
});

passport.use("local", localStrategy);

module.exports = passport;
