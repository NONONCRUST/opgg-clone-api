"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const perkStatsSchema = new mongoose_1.Schema({
    defense: Number,
    flex: Number,
    offense: Number,
});
const perkStyleSelectionSchema = new mongoose_1.Schema({
    perk: Number,
    var1: Number,
    var2: Number,
    var3: Number,
});
const perkStyleSchema = new mongoose_1.Schema({
    description: String,
    selections: [perkStyleSelectionSchema],
    style: Number,
});
const perkSchema = new mongoose_1.Schema({
    statPerks: perkStatsSchema,
    styles: [perkStyleSchema],
});
const participantsSchema = new mongoose_1.Schema({
    summonerName: String,
    kills: Number,
    assists: Number,
    deaths: Number,
    champLevel: Number,
    championName: String,
    detectorWardsPlaced: Number,
    wardsPlaced: Number,
    wardsKilled: Number,
    doubleKills: Number,
    tripleKills: Number,
    quadraKills: Number,
    pentaKills: Number,
    goldEarned: Number,
    individualPosition: String,
    item0: Number,
    item1: Number,
    item2: Number,
    item3: Number,
    item4: Number,
    item5: Number,
    item6: Number,
    totalDamageDealt: Number,
    totalDamageDealtToChampions: Number,
    summoner1Id: Number,
    summoner2Id: Number,
    perks: perkSchema,
    totalMinionsKilled: Number,
    win: Boolean,
});
const objectiveSchema = new mongoose_1.Schema({
    first: Boolean,
    kills: Number,
});
const objectivesSchema = new mongoose_1.Schema({
    baron: objectiveSchema,
    champion: objectiveSchema,
    dragon: objectiveSchema,
    inhibitor: objectiveSchema,
    riftHerald: objectiveSchema,
    tower: objectiveSchema,
});
const banSchema = new mongoose_1.Schema({
    championId: Number,
    pickTurn: Number,
});
const teamSchema = new mongoose_1.Schema({
    bans: [banSchema],
    objectives: objectivesSchema,
    teamId: Number,
    win: Boolean,
});
const matchSchema = new mongoose_1.Schema({
    gameId: Number,
    gameDuration: Number,
    gameStartTimestamp: Number,
    gameEndTimestamp: Number,
    gameMode: String,
    queueId: Number,
    teams: [teamSchema],
    participants: [participantsSchema],
});
const matchesSchema = new mongoose_1.Schema({
    summonerName: String,
    matches: [matchSchema],
    updatedAt: Date,
});
const MatchModel = mongoose_1.models.matches || (0, mongoose_1.model)("matches", matchesSchema);
exports.default = MatchModel;
