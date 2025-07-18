const Comment = require("../Models/Comment");

exports.createComment = async (req, res) => {
const { userId, username, message } = req.body;
try {   
const newComment = new Comment({ userId, username, message });
await newComment.save();
res.status(201).json(newComment);
} catch (error) {
res.status(500).json({ error: "Failed to create comment" });
}
};


exports.getAllComments = async (req, res) => {
try {
const comments = await Comment.find().sort({ createdAt: -1 });
res.status(200).json(comments);
} catch (error) {
res.status(500).json({ error: "Failed to fetch comments" });
}
};

