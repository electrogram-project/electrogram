import mongoose from "mongoose";

// Schema and type for groups
export const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
  modifiedBy: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "pending",
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

export type Group = mongoose.InferSchemaType<typeof groupSchema>;
