const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { createTokenForUser } = require("../services/auth");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    profileImageUrl: {
      type: String,
      default: "/images/default.jpg",
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  { timestamps: true },
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return;
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(this.password)
    .digest("hex");
  this.salt = salt;
  this.password = hashedPassword;
  next();
});

userSchema.static(
  "matchPasswordandGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found");
    const salt = user.salt;
    const hashedPassword = user.password;
    const userProvidedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    if (hashedPassword === userProvidedPassword) {
      throw new Error("Incorrect Password");
    }
    const token = createTokenForUser(user);
    return token;
  },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
