"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const riot_1 = require("../api/riot");
const matchModel_1 = __importDefault(require("../models/matchModel"));
const summonerModel_1 = __importDefault(require("../models/summonerModel"));
const router = express_1.default.Router();
router.get("/:summoner", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method === "GET") {
        const summonerName = req.params.summoner;
        if (typeof summonerName !== "string")
            return res.status(400).end();
        try {
            const { data: { puuid }, } = yield (0, riot_1.getSummonerByNameApi)(summonerName);
            const { data } = yield (0, riot_1.getMatchIdsByPuuidApi)(puuid);
            const matchesPromise = data.slice(0, 10).map((matchId) => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, riot_1.getMatchByMatchIdApi)(matchId);
                return response.data;
            }));
            const matchList = yield Promise.all(matchesPromise);
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
                        totalDamageDealtToChampions: participant.totalDamageDealtToChampions,
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
            yield matchModel_1.default.findOneAndUpdate({ summonerName: summonerName }, {
                summonerName: summonerName,
                matches: filteredMatchList,
                updatedAt: new Date(),
            }, { upsert: true });
            const response = yield (0, riot_1.getSummonerByNameApi)(summonerName);
            const { name, id, profileIconId, summonerLevel } = response.data;
            const leagueResponse = yield (0, riot_1.getLeagueBySummonerIdApi)(id);
            const rankedSolo = leagueResponse.data.find((league) => {
                return league.queueType === "RANKED_SOLO_5x5";
            });
            const body = {
                name: name,
                profileIconId: profileIconId,
                summonerLevel: summonerLevel,
                queueType: rankedSolo === null || rankedSolo === void 0 ? void 0 : rankedSolo.queueType,
                tier: rankedSolo === null || rankedSolo === void 0 ? void 0 : rankedSolo.tier,
                rank: rankedSolo === null || rankedSolo === void 0 ? void 0 : rankedSolo.rank,
                leaguePoints: rankedSolo === null || rankedSolo === void 0 ? void 0 : rankedSolo.leaguePoints,
                wins: rankedSolo === null || rankedSolo === void 0 ? void 0 : rankedSolo.wins,
                losses: rankedSolo === null || rankedSolo === void 0 ? void 0 : rankedSolo.losses,
                updatedAt: new Date(),
            };
            yield summonerModel_1.default.findOneAndUpdate({ name: summonerName }, body, {
                upsert: true,
            });
            res.status(200).end();
        }
        catch (error) {
            console.log(error);
            res.status(500).end();
        }
    }
}));
exports.default = router;
