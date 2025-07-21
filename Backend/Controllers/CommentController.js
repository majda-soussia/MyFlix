const Comment = require("../Models/Comment");

exports.createCommentByid = async (req, res) => {
try {
const { username, message } = req.body;
const filmId = req.params.id;
const newComment = new Comment({ username, message, filmId });
const savedComment = await newComment.save();
res.status(201).json(savedComment);
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
exports.DeleteCommentByid = async (req, res) => {
        try {
            const commentId = req.params.id;
            const deletedComment = await Comment.findByIdAndDelete(commentId);
            if (!deletedComment) {
                return res.status(404).json({ error: "Comment not found." });
            }
            res.status(200).json({ message: "Comment deleted successfully." });
        } catch (err) {
            console.error("❌ Error deleting comment:", err.message);
            res.status(500).json({ error: "Failed to delete comment." });
        }
    };
exports.UpdateCommentByid = async (req, res) => {
        try {
            const commentId = req.params.id;
            const { message } = req.body;
            const updatedComment = await Comment.findByIdAndUpdate(commentId, { message }, { new: true });
            if (!updatedComment) {
                return res.status(404).json({ error: "Comment not found." });
            }
            res.status(200).json({ message: "Comment updated successfully.", comment: updatedComment });
        } catch (err) {
            console.error("❌ Error updating comment:", err.message);
            res.status(500).json({ error: "Failed to update comment." });
        }
    };

