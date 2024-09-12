const mongoose = require("mongoose");
const { Schema } = mongoose;
const { type } = require("os");

const UserSchema = mongoose.Schema({
  firstName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  lastName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  username: {
    type: mongoose.Schema.Types.String,
    unique: true,
    required: true,
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  email: {
    type: mongoose.Schema.Types.String,
    unique: true,
    required: true,
  },
  atTable: {
    type: Schema.Types.ObjectId, // Reference to the TableSchema
    ref: "Table", // Name of the Table model
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const TableSchema = mongoose.Schema({
  tableNum: {
    type: mongoose.Schema.Types.String,
    unique: true,
    required: true,
  },
  title: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  maxCapacity: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
  currCapacity: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
  usersAtTable: [
    {
      type: Schema.Types.ObjectId, // Reference to the UserSchema
      ref: "User", // Name of the User model
    },
  ],
});

const PostSchema = mongoose.Schema({
  title: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  tag: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  postBody: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  likes: {
    type: mongoose.Schema.Types.Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
});

const CommentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  commentBody: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  likes: {
    type: mongoose.Schema.Types.Number,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

TableSchema.index({ tableNum: "text", title: "text", subject: "text" });
PostSchema.index({ tableNum: "text", title: "text", tag: "text" });

const User = mongoose.model("User", UserSchema);
const Table = mongoose.model("Table", TableSchema);
const Post = mongoose.model("Post", PostSchema);
const Comments = mongoose.model("Comments", CommentSchema);

module.exports = { User, Table, Post, Comments };
