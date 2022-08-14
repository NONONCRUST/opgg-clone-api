import express, { Request, Response } from "express";
import CommentModel from "../models/commentModel";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const championName = req.query.champion;

  const commentArray = await CommentModel.find()
    .where("champion")
    .equals(championName);

  return res.status(200).send(commentArray);
});

router.post("/", async (req: Request, res: Response) => {
  const { name, champion, version, contents } = req.body;

  try {
    await CommentModel.create({
      name: name,
      champion: champion,
      version: version,
      contents: contents,
      createdAt: new Date(),
    });

    return res.status(201).end();
  } catch (error) {
    return res.status(500).end();
  }
});

export default router;
