import { model, Schema } from "mongoose";
import { Gender } from "../common/enum/gender.js";

const noData = "No data provided!";

// USER SCHEMA
const userSchema = new Schema(
  {
    // FIRST NAME
    firstName: {
      type: String,
      minlength: 3,
      maxlength: 100,
      trim: true,
      required: true,
    },

    // LAST NAME
    lastName: {
      type: String,
      minlength: 3,
      maxlength: 100,
      trim: true,
      required: true,
    },

    // EMAIL
    email: {
      type: String,
      maxlength: 100,
      trim: true,
      unique: true,
      required: true,
    },

    // PASSWORD
    password: {
      type: String,
      minlength: 6,
      maxlength: 100,
      trim: true,
      required: true,
      get() {
        return "******";
      },
    },

    // ADDRESS
    address: {
      type: String,
      trim: true,
      default: noData,
    },

    // GENDER
    gender: {
      type: String,
      enum: Object.values(Gender),
    },

    // PHONE NUMBER
    phoneNumber: {
      type: String,
      minlength: 11,
      maxlength: 11,
      default: noData,
    },

    // AGE
    age: {
      type: Number,
      min: 1,
      max: 120,
    },

    // CONFIRM EMAIL
    confirmEmail: {
      type: Boolean,
      default: false,
    },

    // PROFILE IMAGE
    profileImage: {
      type: String,
      default: null,
    },
  },
  {
    strict: true,
    strictQuery: true,
    timestamps: true,
    collection: "user_data",
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true },
  }
);

// Virtual username (firstName + lastName)
userSchema.virtual("username").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const userModel = model("User", userSchema);

export default userModel;