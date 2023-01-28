import mongoose from "mongoose";
const { Schema, model } = mongoose;

const IssueSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title must be filled!"],
  },
  description: {
    type: String,
    required: [true, "Description must be filled!"],
  },
  status: {
    type: String,
    enum: ["open", "in-progress", "closed"],
    default: "open",
    required: true,
  },
  severity: {
    type: String,
    enum: ["minor", "major", "critical"],
    default: "minor",
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  resolvedDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  imgSrc: { type: String, default: null },
  views: { type: Number, default: 0 },
  userId: { type: String, default: "0", required: true },
  userName: { type: String, default: "anonymous", required: true },
});

const IssueItem = model("issue", IssueSchema);

export default IssueItem;
