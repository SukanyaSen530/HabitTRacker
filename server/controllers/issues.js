import IssueItem from "../models/Issue.js";
import mongoose from "mongoose";

//Get All Issues
export const getIssues = async (req, res) => {
  try {
    const issueList = await IssueItem.find();

    res.status(200).json({ success: true, data: issueList });
  } catch (err) {
    res.status(400).json({ success: false, message: "Failed" });
  }
};

//Creating an issue
export const createIssue = async (req, res) => {
  const newIssue = new IssueItem(req.body);
  try {
    await newIssue.save();

    res.status(201).json({ success: true, data: newIssue });
  } catch (err) {
    res.status(409).json({ success: false, message: error.message });
  }
};

//Updating an issue
export const updateIssue = async (req, res) => {
  const { id } = req.params;

  const updatedIssueFromUser = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    res
      .status(404)
      .send({ success: false, message: `No issue with id: ${id}` });

  const updatedIssue = await IssueItem.findByIdAndUpdate(
    id,
    updatedIssueFromUser,
    {
      new: true,
    }
  );

  res.json({ success: true, data: updatedIssue });
};

//updating the views
export const updateViews = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    res
      .status(404)
      .send({ success: false, message: `No issue with id: ${id}` });

  const issue = await IssueItem.findById(id);

  const updatedIssue = await IssueItem.findByIdAndUpdate(
    id,
    { views: issue.views + 1 },
    { new: true }
  );

  res.json({ success: true, data: updatedIssue });
};

//Deleting an issue
export const deleteIssue = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    res
      .status(404)
      .send({ success: false, message: `No issue with id: ${id}` });

  await IssueItem.findByIdAndRemove(id);

  res.json({ success: true, data: id, message: "Issue deleted successfully." });
};

export const getIssueById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    res
      .status(404)
      .send({ success: false, message: `No issue with id: ${id}` });

  const issueItem = await IssueItem.findById(id);

  res.status(200).json({ success: true, data: issueItem });
};
