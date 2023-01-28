import IssueItem from "../models/Issue.js";
import mongoose from "mongoose";

//Get All Issues
export const getIssues = async (req, res) => {
  console.log("Inside Get Issues");
  try {
    const issueList = await IssueItem.find();

    res.status(200).json({ success: true, data: issueList });
  } catch (err) {
    res.status(400).json({ success: false, message: "Failed" });
  }
};

//Creating an issue
export const createIssue = async (req, res) => {
  console.log("Create Issue");
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
  console.log("Update Issue");
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
  console.log("Update View");
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
  console.log("Delete Issue");
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    res
      .status(404)
      .send({ success: false, message: `No issue with id: ${id}` });

  await IssueItem.findByIdAndRemove(id);

  res.json({ success: true, data: id, message: "Issue deleted successfully." });
};

export const getIssueById = async (req, res) => {
  console.log("Get Issue by id");
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    res
      .status(404)
      .send({ success: false, message: `No issue with id: ${id}` });

  const issueItem = await IssueItem.findById(id);

  res.status(200).json({ success: true, data: issueItem });
};

//Get Top 5 Viewed Issues
// export const getTopCharts = async (req, res) => {
//   console.log("Get top 5 viewed issues!");
//   try {
//   } catch (err) {}
// };

// //Getting all issues of a specific user
// export const getIssuesByUserId = async (req, res) => {
//   console.log("Get Issues by user Id");
//   try {
//     const issueList = await IssueItem.find({ userId: req.params.userId });

//     res.status(200).json({ success: true, data: issueList });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };
