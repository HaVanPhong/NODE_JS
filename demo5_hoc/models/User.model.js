const configuration = require("../configs/configuration");

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "Duplicate username"],
    },
    password: String,
    email: String,
    role: String,
  },
  { timestamps: true }
);

userSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (user.password) {
    user.password = bcrypt.hashSync(user.password, configuration.SALT_ROUNDS);
  }
  next();
});

userSchema.pre("findOneAndUpdate", function (next) {
  const _update = { ...this.getUpdate() };

  if (_update.password) {
    _update.password = bcrypt.hashSync(
      _update.password,
      configuration.SALT_ROUNDS
    );
  }

  this.setUpdate(_update);
  next();
});

module.exports = mongoose.model("User", userSchema, "Users");
