const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: String,
    password: String,
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
  user.password = bcrypt.hashSync(user.password, 10);
  next();
});

userSchema.pre("findOneAndUpdate", function (next) {
  const _update = { ...this.getUpdate() };

  if (_update.password) {
    _update.password = bcrypt.hashSync(_update.password, 10);
  }

  this.setUpdate(_update);
  next();
});

module.exports = mongoose.model("User", userSchema, "Users");
