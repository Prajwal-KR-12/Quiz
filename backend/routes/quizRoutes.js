import express from "express";
import Quiz from "../models/Quiz.js";
import User from "../models/user.js";

const router = express.Router();

// GET all quiz questions (without revealing correctAnswer to frontend)
router.get("/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const questions = await Quiz.find({ category }, { correctAnswer: 0 }); // hide correct answers
    res.json(questions);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// POST route to submit answers and calculate score
router.post("/submit", async (req, res) => {
  const { userId, answers, category } = req.body;
  try {
    const questions = await Quiz.find({ category }); // Fetch questions for the specific category

    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) score++;
    });

    // Update user's score in database
    await User.findByIdAndUpdate(userId, { score });
    res.json({ msg: "Score updated", score });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


export default router
