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
const summonerModel_1 = __importDefault(require("../models/summonerModel"));
const riot_1 = require("../api/riot");
const router = express_1.default.Router();
router.get("/:summoner", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const summonerName = req.params.summoner;
    const summonerArray = yield summonerModel_1.default.find()
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
        const response = yield (0, riot_1.getSummonerByNameApi)(summonerName);
        const { name, id, profileIconId, summonerLevel } = response.data;
        const leagueResponse = yield (0, riot_1.getLeagueBySummonerIdApi)(id);
        const rankedSolo = leagueResponse.data.find((league) => {
            league.queueType === "RANKED_SOLO_5x5";
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
        yield summonerModel_1.default.create({
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
        });
        return res.status(200).send(body);
    }
    catch (error) {
        console.log(error);
        if (error)
            return res.status(404).end();
        return res.status(500).end();
    }
}));
exports.default = router;
