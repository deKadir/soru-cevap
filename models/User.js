const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwtwebtoken = require("jsonwebtoken");
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "please provide name"],
  },
  email: {
    type: String,
    required: [true, "please provide email"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please provide valid email",
    ],
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  password: {
    type: String,
    minlength: [6, "password length must at least 6"],
    required: [true, "please provide password"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
  },
  about: {
    type: String,
  },
  location: {
    type: String,
  },
  website: {
    type: String,
  },
  profileImg: {
    type: String,
    default: "default.jpg",
  },
  blocked: {
    type: Boolean,
    default: false,
  },
});
//userSchema methods
UserSchema.methods.generateJwtFromUser = function () {
  const { JWT_SECRET, JWT_EXPIRE } = process.env;
  const payload = {
    id: this._id,
    name: this.name,
  };
  const token = jwtwebtoken.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });

  return token;
};

//hooks
UserSchema.pre("save", function (next) {
  //parola degismemisse
  if (!this.isModified("password")) {
    next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(err);
    bcrypt.hash(this.password, salt, (err, h) => {
      if (err) next(err);
      this.password = h;
      next();
    });
  });
});
module.exports = mongoose.model("User", UserSchema);
