import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },   // Array of strings
  correctAnswer: { type: String, required: true },
  category: { type: String, required: true }
});

export default mongoose.model("Quiz", questionSchema);
