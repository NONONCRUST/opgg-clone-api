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
const riot_1 = require("../api/riot");
const router = express_1.default.Router();
router.get("/featured-game", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).end();
}));
router.get("/summoner/:summoner", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const summonerName = req.params.summoner;
    if (typeof summonerName !== "string")
        return res.status(400).end();
    try {
        const { data: { id }, } = yield (0, riot_1.getSummonerByNameApi)(summonerName);
        const response = yield (0, riot_1.getCurrentGameBySummonerIdApi)(id);
        console.log("summoner is in game!");
        return res.status(200).send(response.data);
    }
    catch (error) {
        return res.status(200).end();
    }
}));
exports.default = router;
