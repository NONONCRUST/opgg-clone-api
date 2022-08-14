"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const summonerSchema = new mongoose_1.Schema({
    name: String,
    profileIconId: Number,
    summonerLevel: Number,
    queueType: String,
    tier: String,
    rank: String,
    leaguePoints: Number,
    wins: Number,
    losses: Number,
    updatedAt: Date,
});
const SummonerModel = mongoose_1.models.summoners || (0, mongoose_1.model)("summoners", summonerSchema);
exports.default = SummonerModel;
