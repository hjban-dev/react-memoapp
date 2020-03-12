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

// MODIFY MEMO
router.put("/:id", (req, res) => {});

// DELETE MEMO
router.delete("/:id", (req, res) => {});

// GET MEMO LIST
router.get("/", (req, res) => {});

export default router;
