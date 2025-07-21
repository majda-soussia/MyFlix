const express = require("express");
const router = express.Router();
const CommentController = require("../Controllers/CommentController");

router.post("/create/:id", CommentController.createCommentByid);
router.get("/", CommentController.getAllComments);
router.put("/update/:id", CommentController.UpdateCommentByid);
router.delete("/delete/:id", CommentController.DeleteCommentByid);


module.exports=router;