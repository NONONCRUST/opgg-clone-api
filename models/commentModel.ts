import { model, models, Schema } from "mongoose";

const commentSchema = new Schema({
  name: String,
  champion: String,
  version: String,
  contents: String,
  createdAt: Date,
});

const CommentModel = models.comments || model("comments", commentSchema);

export default CommentModel;
