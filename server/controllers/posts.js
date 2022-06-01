import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
	try {
		const postMessages = await PostMessage.find();

		res.status(200).json(postMessages);
	} catch (error) {
		res.status(404).json(error.message);
	}
}

export const createPost = async (req, res) => {
	const body = req.body;
	const newPost = new PostMessage(body);

	try {
		await newPost.save();

		res.status(201).json(newPost)
	} catch (error) {
		res.status(409).json(error.message);
	}
}
export const updatePost = async (req, res) => {
	const { id: _id } = req.params;
	const { title, message, creator, selectedFile, tags } = req.body;

	if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No documents with that ID");

	const updatedPost = { creator, title, message, tags, selectedFile, _id };

	await PostMessage.findByIdAndUpdate(_id, updatedPost, { new: true });

	res.json(updatedPost);
}