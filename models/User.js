const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveError, addUpdateSettings } = require("./hooks");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
    },
    token: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", addUpdateSettings);

userSchema.post("findOneAndUpdate", handleSaveError);

const userSignupSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const userSigninSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const User = model("user", userSchema);

module.exports = { User, userSignupSchema, userSigninSchema };
