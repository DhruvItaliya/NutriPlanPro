const Register = require("../src/models/Register");
const Community = require("../src/models/Community");

const addQuestion = async (req, res) => {
  try {
    const { id, question, tags } = req.body;
    const result1 = await Register.findById(id);
    console.log(id, question, tags);
    if (!result1) return res.status(404).json({ error: "User Not found" });
    const user = result1._id;
    const post = new Community({
      user,
      question,
      tags,
    });
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const addAnswer = async (req, res) => {
  try {
    const { user_id, question_id, answer } = req.body;

    // Check if the question exists
    console.log( user_id, question_id, answer);
    const questionExists = await Community.findOne({ _id: question_id });
    if (!questionExists) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Update the Community document to add the answer
    const result = await Community.updateOne(
      { _id: question_id },
      { $push: { answers: { user: user_id, answer: answer } } }
    );

    res
      .status(200)
      .json({ message: "Answer added successfully", result: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAllPost = async (req, res) => {
  try {
    const result = await Community.find({}).sort({ timestamps: - 1 })
      .populate('user') // Populate the user field in the main object
      .populate('answers.user'); // Populate the user field within the answers array
    if (!result || result.length === 0) {
      return res.status(500).json({ error: "No data found" });
    }
    res.status(200).json({success:true,result});
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addAnswer, addQuestion, getAllPost };