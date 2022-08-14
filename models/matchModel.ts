import { model, models, Schema } from "mongoose";

const perkStatsSchema = new Schema({
  defense: Number,
  flex: Number,
  offense: Number,
});

const perkStyleSelectionSchema = new Schema({
  perk: Number,
  var1: Number,
  var2: Number,
  var3: Number,
});

const perkStyleSchema = new Schema({
  description: String,
  selections: [perkStyleSelectionSchema],
  style: Number,
});

const perkSchema = new Schema({
  statPerks: perkStatsSchema,
  styles: [perkStyleSchema],
});

const participantsSchema = new Schema({
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

const objectiveSchema = new Schema({
  first: Boolean,
  kills: Number,
});

const objectivesSchema = new Schema({
  baron: objectiveSchema,
  champion: objectiveSchema,
  dragon: objectiveSchema,
  inhibitor: objectiveSchema,
  riftHerald: objectiveSchema,
  tower: objectiveSchema,
});

const banSchema = new Schema({
  championId: Number,
  pickTurn: Number,
});

const teamSchema = new Schema({
  bans: [banSchema],
  objectives: objectivesSchema,
  teamId: Number,
  win: Boolean,
});

const matchSchema = new Schema({
  gameId: Number,
  gameDuration: Number,
  gameStartTimestamp: Number,
  gameEndTimestamp: Number,
  gameMode: String,
  queueId: Number,
  teams: [teamSchema],
  participants: [participantsSchema],
});

const matchesSchema = new Schema({
  summonerName: String,
  matches: [matchSchema],
  updatedAt: Date,
});

const MatchModel = models.matches || model("matches", matchesSchema);

export default MatchModel;
