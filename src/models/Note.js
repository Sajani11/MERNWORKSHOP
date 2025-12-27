import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#7a756eff',
    },
  },
  {
    timestamps: true,
  }
);

// Use existing model if it exists, otherwise create a new one
const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);

export default Note;
