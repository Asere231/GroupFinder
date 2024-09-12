const { Router } = require("express");
const { postValidationSchema } = require("../util/validationSchemas.js");
const {
  checkSchema,
  validationResult,
  matchedData,
} = require("express-validator");
const {
  User,
  Table,
  Post,
  Comments,
} = require("../mongooseSchemas/schemas.js");

const router = Router();

// Create a Post
router.post(
  "/api/forum-post",
  checkSchema(postValidationSchema),
  async (request, response) => {
    try {
      let result = validationResult(request);

      if (!result.isEmpty()) return response.status(400).send(result.array());

      let data = matchedData(request);
      let foundUser = await User.findById(data.userId);

      if (!foundUser)
        return response.status(400).send({ error: "User not found" });

      data.user = foundUser._id;
      data.likes = 0;

      let post = new Post(data);

      await post.save();

      return response.status(200).send({
        ...post.toObject(),
        msg: "Post successfully created with user",
      });
    } catch (err) {
      // if (err.code === 11000 && err.keyPattern && err.keyValue) {
      //   return response.status(400).send({ error: "Post already exist" });
      // } else {
      return response.status(400).send({ error: err.message });
      // }
    }
  }
);

// Edit post
router.patch("/api/edit-post", async (request, response) => {
  try {
    let { body } = request;

    let foundPost = await Post.findById(body.postId);

    if (!foundPost)
      return response.status(400).send({ error: "Post not found" });

    if (body.tableNum) {
      foundPost.tableNum = body.tableNum;
    }
    if (body.title) {
      foundPost.title = body.title;
    }
    if (body.tag) {
      foundPost.tag = body.tag;
    }
    if (body.postBody) {
      foundPost.postBody = body.postBody;
    }
    if (body.commentBody) {
      let newComment = new Comment({
        user: body.userId,
        commentBody: body.commentBody,
        post: foundPost._id,
      });
      await newComment.save();
      foundPost.comments.push(newComment._id);
    }
    if (body.atTable) {
      foundPost.atTable.push(body.atTable);
    }
    if (body.likes !== undefined) {
      foundPost.likes = body.likes;
    }

    await foundPost.save();

    return response
      .status(200)
      .send({ ...foundPost.toObject(), msg: "Post updated successfully!" });
  } catch (err) {
    return response.status(500).send({ error: err.message });
  }
});

// Add comment to post
router.post("/api/forum-comment", async (request, response) => {
  try {
    let { body } = request;

    // console.log(`body.username: ${body.username}`);
    // console.log("body:", body);

    let foundUser = await User.findById(body.userId);
    let foundPost = await Post.findById(body.postId);

    if (!foundUser)
      return response.status(400).send({ error: "User not found" });

    if (!foundPost)
      return response.status(400).send({ error: "Post not found" });

    body.user = foundUser._id;
    body.likes = 0;
    body.post = foundPost._id;

    let comment = new Comments(body);
    await comment.save();

    foundPost.comments.push(comment._id);

    await foundPost.save();

    return response.status(200).send({
      ...comment.toObject(),
      msg: "Comment successfully created with user",
    });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyValue) {
      return response.status(400).send({ error: "Comment already exist" });
    } else {
      return response.status(400).send({ error: err.message });
    }
  }
});

// Edit comment
router.patch("/api/edit-comment", async (request, response) => {
  try {
    let { body } = request;

    let foundComment = await Comments.findById(body.commentId);

    if (!foundComment)
      return response.status(400).send({ error: "Comment not found" });

    if (body.commentBody) {
      foundComment.commentBody = body.commentBody;
    }
    if (body.likes) {
      foundComment.likes = body.likes;
    }

    await foundComment.save();

    return response.status(200).send({
      ...foundComment.toObject(),
      message: "Comment updated successfully",
    });
  } catch (err) {
    return response.status(500).send({ error: err.message });
  }
});

// Get all posts before user login
router.get("/all-posts", async (request, response) => {
  try {
    let posts = await Post.find();

    return response.status(200).send(posts);
  } catch (err) {
    return response.status(500).send({ error: "Internal server error" });
  }
});

// Get all comments before user login
router.get("/all-comments", async (request, response) => {
  try {
    let comments;

    if (request.query.post) {
      comments = await Comments.find({ post: request.query.post });
    } else {
      comments = await Comments.find();
    }

    return response.status(200).send(comments);
  } catch (err) {
    return response.status(500).send({ error: "Internal server error" });
  }
});

// Delete post with corresponding comments
router.delete("/api/delete-post", async (request, response) => {
  try {
    let { body } = request;

    let foundPost = await Post.findById(body.postId);

    if (!foundPost)
      return response.status(400).send({ error: "Post not found" });

    for (let commentId of foundPost.comments) {
      let foundComment = await Comment.findById(commentId);

      if (!foundComment)
        return response.status(400).send({
          error: "Comment not found",
        });

      await foundComment.delete();
    }

    await foundPost.deleteOne();

    return response
      .status(200)
      .send({ msg: "Post successfully deleted with corresponding comments" });
  } catch (err) {
    return response.status(500).send({ error: err.message });
  }
});

// Delete comment from a post
router.delete("/api/delete-comment", async (request, response) => {
  try {
    let { body } = request;

    let foundComment = await Comments.findById(body.commentId);

    if (!foundComment)
      return response.status(400).send({
        error: "Comment not found",
      });

    let foundPost = await Post.findById(body.postId);

    if (!foundPost)
      return response.status(400).send({
        error: "Post not found",
      });

    foundPost.comments.filter((comments) => comments === foundComment.id);

    await foundPost.save();
    await foundComment.deleteOne();

    return response
      .status(200)
      .send({ msg: "Comment successfully deleted from corresponding post" });
  } catch (err) {
    return response.status(500).send({ error: err.message });
  }
});

module.exports = router;
