import express, { Request, Response } from "express";
import {
  getCurrentGameBySummonerIdApi,
  getSummonerByNameApi,
} from "../api/riot";

const router = express.Router();

router.get("/featured-game", async (req: Request, res: Response) => {
  res.status(200).end();
});

router.get("/summoner/:summoner", async (req: Request, res: Response) => {
  const summonerName = req.params.summoner;
  if (typeof summonerName !== "string") return res.status(400).end();

  try {
    const {
      data: { id },
    } = await getSummonerByNameApi(summonerName);
    const response = await getCurrentGameBySummonerIdApi(id);
    console.log("summoner is in game!");
    return res.status(200).send(response.data);
  } catch (error: any) {
    return res.status(200).end();
  }
});

export default router;
