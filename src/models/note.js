import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    // Change content to description
    type: String,
    required: true,
  },
  user: {
    type: String,
    ref: "User",
    required: true,
  },
});

const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);

export default Note;
