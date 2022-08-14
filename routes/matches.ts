import express from "express";
import { Request, Response } from "express";
import MatchModel from "../models/matchModel";

const router = express.Router();

router.get("/:summoner", async (req: Request, res: Response) => {
  try {
    const summonerName = req.params.summoner;
    if (typeof summonerName !== "string") return res.status(400).end();

    const matchesArray = await MatchModel.find()
      .where("summonerName")
      .equals(summonerName);
    console.log(matchesArray);

    if (matchesArray.length === 0) res.status(200).send([]);

    const body = {
      summonerName: matchesArray[0].summonerName,
      matches: matchesArray[0].matches,
      updatedAt: matchesArray[0].updatedAt,
    };

    return res.status(200).send(body);
  } catch (error) {
    console.log(error);
    return res.status(200).send([]);
  }
});

export default router;
