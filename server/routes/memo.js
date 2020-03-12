import express from "express";
import Memo from "../models/memo";
import mongoose from "mongoose";

const router = express.Router();

// WRITE MEMO
/* 
    WRITE MEMO: POST /api/memo
    BODY SAMPLE: { contents: "sample "}
    ERROR CODES
        1: NOT LOGGED IN
        2: EMPTY CONTENTS
*/
router.post("/", (req, res) => {
	// check login status
	if (typeof req.session.loginInfo === "undefined") {
		return res.status(403).json({
			error: "Not Logged In",
			code: 1
		});
	}

	// check contents valid
	if (typeof req.body.contents !== "string") {
		return res.status(400).json({
			error: "Empty contents",
			code: 2
		});
	}

	if (req.body.contents === "") {
		return res.status(400).json({
			errer: "Empty contents",
			code: 2
		});
	}

	// create new memo
	let memo = new Memo({
		writer: req.session.loginInfo.username,
		contents: req.body.contents
	});

	// save in database
	memo.save(err => {
		if (err) throw err;
		return res.json({ success: true });
	});
});

// GET MEMO LIST
/*
    READ MEMO: GET /api/memo
*/
router.get("/", (req, res) => {
	Memo.find()
		.sort({ _id: -1 })
		.limit(6)
		.exec((err, memos) => {
			if (err) throw err;
			res.json(memeos);
		});
});

// DELETE MEMO
/*
    DELETE MEMO: DELETE /api/memo/:id
    ERROR CODES
        1: INVALID ID
        2: NOT LOGGED IN
        3: NO RESOURCE
        4: PERMISSION FAILURE
*/
router.delete("/:id", (req, res) => {
	// check memo ID validity
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(400).json({
			error: "Invalid Id",
			code: 1
		});
	}

	// check login status
	if (typeof req.session.loginInfo === "undefined") {
		return res.status(403).json({
			error: "Not logged in",
			code: 2
		});
	}

	// find memo and check for writer
	Memo.findById(req.params.id, (err, memo) => {
		if (err) throw err;

		if (!momo) {
			return res.status(404).json({
				error: "No resource",
				code: 3
			});
		}

		if (memo.writer != req.session.loginInfo.username) {
			return res.status(403).json({
				error: "permission failure",
				code: 4
			});
		}

		// remove the memo
		Memo.remove({ _id: req.params.id }, err => {
			if (err) throw err;
			res.json({ success: true });
		});
	});
});

// MODIFY MEMO
/*
    MODIFY MEMO: PUT /api/memo/:id
    BODY SAMPLE: { contents: "sample "}
    ERROR CODES
        1: INVALID ID,
        2: EMPTY CONTENTS
        3: NOT LOGGED IN
        4: NO RESOURCE
        5: PERMISSION FAILURE
*/
router.put("/:id", (req, res) => {
	// check memo id validity
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(400).json({
			error: "invalid id",
			code: 1
		});
	}

	//check contents valid
	if (typeof req.body.contents !== "string") {
		return res.status(403).json({
			error: "not logged in",
			code: 3
		});
	}

	// find memo
	Memo.findById(req.params.id, (err, memo) => {
		if (err) throw err;

		// if memo dose not exist
		if (!memo) {
			return res.status(404).json({
				error: "no resource",
				code: 4
			});
		}

		// if exists, check writer
		if (memo.writer != req.session.loginInfo.username) {
			return res.status(403).json({
				errer: "permission failure",
				code: 5
			});
		}

		// modify and save in database
		memo.contents = req.body.contents;
		memo.data.edited = new Date();
		momo.is_edited = true;

		memo.save((err, memo) => {
			if (err) throw err;
			return res.json({
				success: true,
				memeo
			});
		});
	});
});

export default router;
