// API Routes에서 라이엇 api에 요청을 보낼 때 사용하는 api 목록
import { axiosRiotAsia, axiosRiotKr } from ".";
import {
  GetCurrentGameBySummonerNameApiResponseType,
  GetFeaturedGameApiResponseType,
  GetLeagueBySummonerIdApiResponseType,
  GetMatchByMatchIdApiResponseType,
  GetMatchIdsByPuuidApiResponseType,
  GetPlatformDataApiResponseType,
  GetRotationApiResponseType,
  GetSummonerByNameApiResponseType,
} from "../types/riot";

export const getRotationApi = () =>
  axiosRiotKr.get<GetRotationApiResponseType>(
    "/lol/platform/v3/champion-rotations"
  );

export const getSummonerByNameApi = (summonerName: string) =>
  axiosRiotKr.get<GetSummonerByNameApiResponseType>(
    `/lol/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}`
  );

export const getFeaturedGameApi = () =>
  axiosRiotKr.get<GetFeaturedGameApiResponseType>(
    "/lol/spectator/v4/featured-games"
  );

export const getCurrentGameBySummonerIdApi = (summonerId: string) =>
  axiosRiotKr.get<GetCurrentGameBySummonerNameApiResponseType>(
    `/lol/spectator/v4/active-games/by-summoner/${summonerId}`
  );

export const getPlatformDataApi = () =>
  axiosRiotKr.get<GetPlatformDataApiResponseType>(
    "/lol/status/v4/platform-data"
  );

export const getMatchIdsByPuuidApi = (puuid: string) =>
  axiosRiotAsia.get<GetMatchIdsByPuuidApiResponseType>(
    `/lol/match/v5/matches/by-puuid/${puuid}/ids`
  );

export const getMatchByMatchIdApi = (matchId: string) =>
  axiosRiotAsia.get<GetMatchByMatchIdApiResponseType>(
    `lol/match/v5/matches/${matchId}`
  );

export const getLeagueBySummonerIdApi = (summonerId: string) =>
  axiosRiotKr.get<GetLeagueBySummonerIdApiResponseType>(
    `/lol/league/v4/entries/by-summoner/${summonerId}`
  );
