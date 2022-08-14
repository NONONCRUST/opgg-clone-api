import { model, models, Schema } from "mongoose";

const summonerSchema = new Schema({
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

const SummonerModel = models.summoners || model("summoners", summonerSchema);

export default SummonerModel;
