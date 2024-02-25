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
  addedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  addedBy: {
    type: String,
    default: "",
  },
  editedAt: {
    type: Date,
    default: null,
  },
  editedBy: {
    type: String,
    default: "",
  },
  deletedAt: {
    type: Date,
    default: null,
  },
  deletedBy: {
    type: String,
    default: "",
  },
});
export type Group = mongoose.InferSchemaType<typeof groupSchema>;

// Schema and type for faqs
export const faqSchema = new mongoose.Schema({
  message_id: {
    type: Number,
    required: true,
  },
  chat: Object,
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  preview: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});
export type Faq = mongoose.InferSchemaType<typeof faqSchema>;

export const suggestionSchema = new mongoose.Schema({
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
  addedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  approvedBy: {
    type: String,
    default: "",
  },
  approvedAt: {
    type: Date,
    default: null,
  },
  rejectedBy: {
    type: String,
    default: "",
  },
  rejectedAt: {
    type: Date,
    default: null,
  },
});
export type Suggestion = mongoose.InferSchemaType<typeof suggestionSchema>;

// Schema and type for contact messages
export const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  addedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
export type Contact = mongoose.InferSchemaType<typeof contactSchema>;
