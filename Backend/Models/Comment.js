const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
username: { type: String, required: true },
message: { type: String, required: true },
createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Comment', commentSchema);

