import axiosInstance from "axios";
import dotenv from "dotenv";
dotenv.config();

export const axiosRiotKr = axiosInstance.create({
  baseURL: "https://kr.api.riotgames.com",
  withCredentials: true,
  params: {
    api_key: process.env.RIOT_API_KEY,
  },
});

export const axiosRiotAsia = axiosInstance.create({
  baseURL: "https://asia.api.riotgames.com",
  withCredentials: true,
  params: {
    api_key: process.env.RIOT_API_KEY,
  },
});
