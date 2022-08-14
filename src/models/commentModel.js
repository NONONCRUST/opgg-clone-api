"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    name: String,
    champion: String,
    version: String,
    contents: String,
    createdAt: Date,
});
const CommentModel = mongoose_1.models.comments || (0, mongoose_1.model)("comments", commentSchema);
exports.default = CommentModel;
