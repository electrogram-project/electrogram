import mongoose from "mongoose";
import { createClient, SupabaseClient } from "supabase";
import {
  contactSchema,
  faqSchema,
  groupSchema,
  suggestionSchema,
} from "$utils/schemas.ts";
import { MONGO_URI, SUPABASE_KEY, SUPABASE_URL } from "$utils/constants.ts";

// Connect to MongoDB though Mongoose
try {
  await mongoose.connect(MONGO_URI);
} catch (error) {
  console.error("Error connecting to MongoDB: ", error);
}
// Create models
export const Group = mongoose.model("Group", groupSchema);
export const Faq = mongoose.model("Faq", faqSchema);
export const Suggestion = mongoose.model("Suggestion", suggestionSchema);
export const Contact = mongoose.model("Contact", contactSchema);

// Connect to Supabase
let supabase: SupabaseClient;
try {
  supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
} catch (error) {
  console.error("Error creating Supabase client: ", error);
}
export { supabase };

// Connect to Deno KV
export const kv = await Deno.openKv();
