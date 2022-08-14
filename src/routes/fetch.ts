import { Request, Response } from "express";
import express from "express";
import {
  getLeagueBySummonerIdApi,
  getMatchByMatchIdApi,
  getMatchIdsByPuuidApi,
  getSummonerByNameApi,
} from "../api/riot";
import MatchModel from "../models/matchModel";
import SummonerModel from "../models/summonerModel";

const router = express.Router();

router.get("/:summoner", async (req: Request, res: Response) => {
  if (req.method === "GET") {
    const summonerName = req.params.summoner;
    if (typeof summonerName !== "string") return res.status(400).end();

    try {
      const {
        data: { puuid },
      } = await getSummonerByNameApi(summonerName);

      const { data } = await getMatchIdsByPuuidApi(puuid);

      const matchesPromise = data.slice(0, 10).map(async (matchId) => {
        const response = await getMatchByMatchIdApi(matchId);
        return response.data;
      });

      const matchList = await Promise.all(matchesPromise);

      const filteredMatchList = matchList.map((match) => {
        const participants = match.info.participants.map((participant) => {
          return {
            summonerName: participant.summonerName,
            kills: participant.kills,
            assists: participant.assists,
            deaths: participant.deaths,
            champLevel: participant.champLevel,
            championName: participant.championName,
            detectorWardsPlaced: participant.detectorWardsPlaced,
            wardsPlaced: participant.wardsPlaced,
            wardsKilled: participant.wardsKilled,
            doubleKills: participant.doubleKills,
            tripleKills: participant.tripleKills,
            quadraKills: participant.quadraKills,
            pentaKills: participant.pentaKills,
            goldEarned: participant.goldEarned,
            individualPosition: participant.individualPosition,
            item0: participant.item0,
            item1: participant.item1,
            item2: participant.item2,
            item3: participant.item3,
            item4: participant.item4,
            item5: participant.item5,
            item6: participant.item6,
            totalDamageDealt: participant.totalDamageDealt,
            totalDamageDealtToChampions:
              participant.totalDamageDealtToChampions,
            summoner1Id: participant.summoner1Id,
            summoner2Id: participant.summoner2Id,
            perks: participant.perks,
            totalMinionsKilled: participant.totalMinionsKilled,
            win: participant.win,
          };
        });

        return {
          gameStartTimestamp: match.info.gameStartTimestamp,
          gameEndTimestamp: match.info.gameEndTimestamp,
          gameId: match.info.gameId,
          gameDuration: match.info.gameDuration,
          gameMode: match.info.gameMode,
          queueId: match.info.queueId,
          teams: match.info.teams,
          participants: participants,
        };
      });

      await MatchModel.findOneAndUpdate(
        { summonerName: summonerName },
        {
          summonerName: summonerName,
          matches: filteredMatchList,
          updatedAt: new Date(),
        },
        { upsert: true }
      );

      const response = await getSummonerByNameApi(summonerName);
      const { name, id, profileIconId, summonerLevel } = response.data;

      const leagueResponse = await getLeagueBySummonerIdApi(id);

      const rankedSolo = leagueResponse.data.find((league) => {
        return league.queueType === "RANKED_SOLO_5x5";
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

      await SummonerModel.findOneAndUpdate({ name: summonerName }, body, {
        upsert: true,
      });

      res.status(200).end();
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  }
});

export default router;
