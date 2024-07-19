import mongoose from "mongoose";
import { groupSchema } from "utils/schemas.ts";
import { MONGO_URI } from "utils/constants.ts";

// Connect to MongoDB though Mongoose
try {
  await mongoose.connect(MONGO_URI);
} catch (error) {
  console.error("Error connecting to MongoDB: ", error);
}

// Create models
export const Groups = mongoose.model("Group", groupSchema);
