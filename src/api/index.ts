import axiosInstance from "axios";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.RIOT_API_KEY);

export const axiosRiotKr = axiosInstance.create({
  baseURL: "https://kr.api.riotgames.com",
  withCredentials: true,
  params: {
    api_key: "RGAPI-4311aa96-fc65-4e9f-a859-04c31d60cac9",
  },
});

export const axiosRiotAsia = axiosInstance.create({
  baseURL: "https://asia.api.riotgames.com",
  withCredentials: true,
  params: {
    api_key: "RGAPI-4311aa96-fc65-4e9f-a859-04c31d60cac9",
  },
});
