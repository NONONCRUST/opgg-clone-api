"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosRiotAsia = exports.axiosRiotKr = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.axiosRiotKr = axios_1.default.create({
    baseURL: "https://kr.api.riotgames.com",
    withCredentials: true,
    params: {
        api_key: process.env.RIOT_API_KEY,
    },
});
exports.axiosRiotAsia = axios_1.default.create({
    baseURL: "https://asia.api.riotgames.com",
    withCredentials: true,
    params: {
        api_key: process.env.RIOT_API_KEY,
    },
});
