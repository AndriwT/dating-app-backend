import { model, Schema } from "mongoose";

const LanguageSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = model("Language", LanguageSchema);
