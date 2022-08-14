import { Request, Response } from "express";
import express from "express";
import SummonerModel from "../models/summonerModel";
import { getLeagueBySummonerIdApi, getSummonerByNameApi } from "../api/riot";

const router = express.Router();

router.get("/:summoner", async (req: Request, res: Response) => {
  const summonerName = req.params.summoner;

  const summonerArray = await SummonerModel.find()
    .where("name")
    .equals(summonerName);
  if (summonerArray.length !== 0) {
    const summoner = summonerArray[0];
    const body = {
      name: summoner.name,
      profileIconId: summoner.profileIconId,
      summonerLevel: summoner.summonerLevel,
      queueType: summoner.queueType,
      tier: summoner.tier,
      rank: summoner.rank,
      leaguePoints: summoner.leaguePoints,
      wins: summoner.wins,
      losses: summoner.losses,
      updatedAt: summoner.updatedAt,
    };

    console.log("summoner found from mongodb!");
    return res.status(200).send(body);
  }

  try {
    const response = await getSummonerByNameApi(summonerName as string);
    const { name, id, profileIconId, summonerLevel } = response.data;

    const leagueResponse = await getLeagueBySummonerIdApi(id);

    const rankedSolo = leagueResponse.data.find((league: any) => {
      league.queueType === "RANKED_SOLO_5x5";
    });

    const body = {
      name: name,
      profileIconId: profileIconId,
      summonerLevel: summonerLevel,
      queueType: rankedSolo?.queueType,
      tier: rankedSolo?.tier,
      rank: rankedSolo?.rank,
      leaguePoints: rankedSolo?.leaguePoints,
      wins: rankedSolo?.wins,
      losses: rankedSolo?.losses,
      updatedAt: new Date(),
    };

    await SummonerModel.create({
      name: name,
      profileIconId: profileIconId,
      summonerLevel: summonerLevel,
      queueType: rankedSolo?.queueType,
      tier: rankedSolo?.tier,
      rank: rankedSolo?.rank,
      leaguePoints: rankedSolo?.leaguePoints,
      wins: rankedSolo?.wins,
      losses: rankedSolo?.losses,
      updatedAt: new Date(),
    });

    return res.status(200).send(body);
  } catch (error: any) {
    console.log(error);
    if (error) return res.status(404).end();

    return res.status(500).end();
  }
});

export default router;
