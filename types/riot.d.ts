export type GetRotationApiResponseType = {
  freeChampionIds: number[];
  freeChampionIdsForNewPlayers: number[];
  maxNewPlayerLevel: number;
};

export type GetSummonerByNameApiResponseType = SummonerDto;

export type GetFeaturedGameApiResponseType = {
  gameList: {
    bannedChampions: {
      pickTurn: number;
      championId: number;
      championId: number;
    }[];
    gameId: number;
    gameLength: number;
    gameMode: string;
    gameQueueConfigId: number;
    gameStartTime: number;
    gameType: string;
    mapId: number;
    observers: {
      encryptionKey: string;
    };
    participants: {
      bot: boolean;
      championId: number;
      profileIconId: number;
      spell1Id: number;
      spell2Id: number;
      summonerName: "string";
      teamId: number;
    }[];
    platformId: string;
  }[];
  clientRefreshInterval: number;
};

export type GetCurrentGameBySummonerNameApiResponseType = {
  gameId: number;
  gameType: string;
  gameStartTime: number;
  mapId: number;
  gameLength: number;
  platformId: string;
  gameMode: string;
  bannedChampions: {
    pickTurn: number;
    championId: number;
    teamId: number;
  }[];
  gameQueueConfigId: number;
  observers: {
    encryptionKey: string;
  };
  participants: {
    championId: number;
    perks: {
      perkIds: number[];
      perkStyle: number;
      perkSubStyle: number;
    };
    profileIconId: number;
    bot: boolean;
    teamId: number;
    summonerName: string;
    summonerId: string;
    spell1Id: number;
    spell2Id: number;
    gameCustomizationObjects: {
      category: string;
      content: string;
    }[];
  }[];
};

export type GetPlatformDataApiResponseType = {
  id: string;
  name: string;
  locales: string[];
  maintenances: StatusDto[];
  incidents: StatusDto[];
};

export type GetMatchIdsByPuuidApiResponseType = string[];

export type GetMatchByMatchIdApiResponseType = MatchDto;

export type GetLeagueBySummonerIdApiResponseType = {
  leagueId: string;
  queueType: string;
  tier: string;
  rank: string;
  summonerId: string;
  summonerName: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}[];

// Dto
type SummonerDto = {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
};

type StatusDto = {
  id: number;
  maintenance_status: "scheduled" | "in_progres" | "complete";
  incident_severity: "info" | "warning" | "critical";
  titles: ContentDto[];
  updates: UpdateDto[];
};

type ContentDto = {
  locale: string;
  content: string;
};

type UpdateDto = {
  id: number;
  author: string;
  publish: boolean;
  publish_locations: string[];
  translations: ContentDto[];
};

type PerkStatsDto = {
  defense: number;
  flex: number;
  offense: number;
};

type PerkStyleSelectionDto = {
  perk: number;
  var1: number;
  var2: number;
  var3: number;
}[];

type PerkStyleDto = {
  description: string;
  selections: PerkStyleSelectionDto;
  style: number;
};

type PerksDto = {
  statPerks: PerkStatsDto;
  styles: PerkStyleDto[];
};

type MatchDto = {
  metadata: MetadataDto;
  info: InfoDto;
};

type MetadataDto = {
  dataVersion: string;
  matchId: string;
  participants: string[];
};

type BanDto = {
  championId: number;
  pickTurn: number;
};

type ObjectiveDto = {
  first: boolean;
  kills: number;
};

type ObjectivesDto = {
  baron: ObjectiveDto;
  champion: ObjectiveDto;
  dragon: ObjectiveDto;
  inhibitor: ObjectiveDto;
  riftHerald: ObjectiveDto;
  tower: ObjectiveDto;
};

type TeamDto = {
  bans: BanDto[];
  objectives: ObjectivesDto;
  teamId: number;
  win: boolean;
};

type InfoDto = {
  gameCreation: number;
  gameDuration: number;
  gameEndTimestamp: number;
  gameId: number;
  gameMode: string;
  gameName: string;
  gameStartTimestamp: number;
  gameType: string;
  gameVersion: string;
  mapId: number;
  participants: ParticipantDto[];
  platformId: string;
  queueId: number;
  teams: TeamDto[];
  tournamentCode: string;
};

type ParticipantDto = {
  assists: number;
  baronKills: number;
  bountyLevel: umber;
  champExperience: number;
  champLevel: number;
  championId: number;
  championName: string;
  championTransform: number;
  consumablesPurchased: number;
  damageDealtToBuildings: number;
  damageDealtToObjectives: number;
  damageDealtToTurrets: number;
  damageSelfMitigated: number;
  deaths: number;
  detectorWardsPlaced: number;
  doubleKills: number;
  dragonKills: number;
  firstBloodAssist: boolean;
  firstBloodKill: boolean;
  firstTowerAssist: boolean;
  firstTowerKill: boolean;
  gameEndedInEarlySurrender: boolean;
  gameEndedInSurrender: boolean;
  goldEarned: number;
  goldSpent: number;
  individualPosition: string;
  inhibitorKills: number;
  inhibitorTakedowns: number;
  inhibitorsLost: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  itemsPurchased: number;
  killingSprees: number;
  kills: number;
  lane: string;
  largestCriticalStrike: number;
  largestKillingSpree: number;
  largestMultiKill: number;
  longestTimeSpentLiving: number;
  magicDamageDealt: number;
  magicDamageDealtToChampions: number;
  magicDamageTaken: number;
  neutralMinionsKilled: number;
  nexusKills: number;
  nexusTakedowns: number;
  nexusLost: number;
  objectivesStolen: number;
  objectivesStolenAssists: number;
  participantid: number;
  pentaKills: number;
  perks: PerksDto;
  physicalDamageDealt: number;
  physicalDamageDealtToChampions: number;
  physicalDamageTaken: number;
  profileIcon: number;
  puuid: string;
  quadraKills: number;
  riotIdName: string;
  riotIdTagline: string;
  role: string;
  sightWardsBoughtInGame: number;
  spell1Casts: number;
  spell2Casts: number;
  spell3Casts: number;
  spell4Casts: number;
  summoner1Casts: number;
  summoner1Id: number;
  summoner2Casts: number;
  summoner2Id: number;
  summonerId: string;
  summonerLevel: number;
  summonerName: string;
  teamEarlySurrendered: boolean;
  teamId: number;
  teamPosition: string;
  timeCCingOthers: number;
  timePlayed: number;
  totalDamageDealt: number;
  totalDamageDealtToChampions: number;
  totalDamageShieldedOnTeammates: number;
  totalDamageTaken: number;
  totalheal: number;
  totalHealsOnTeammates: number;
  totalMinionsKilled: number;
  totalTimeCCDealt: number;
  totalTimeSpentDead: number;
  totalUnitsHealed: number;
  tripleKills: number;
  trueDamageDealt: number;
  trueDamageDealtToChampions: number;
  trueDamageTaken: number;
  turretKills: number;
  turretTakedowns: number;
  turretsLost: number;
  unrealKills: number;
  visionScore: number;
  visionWardsBoughtInGame: number;
  wardsKilled: number;
  wardsPlaced: number;
  win: boolean;
};
