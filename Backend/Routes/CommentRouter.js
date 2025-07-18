const express = require("express");
const router = express.Router();
const CommentController = require("../Controllers/CommentController");

router.post("/create", CommentController.createComment);
router.get("/", CommentController.getAllComments);


module.exports=router;