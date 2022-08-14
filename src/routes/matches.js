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
const matchModel_1 = __importDefault(require("../models/matchModel"));
const router = express_1.default.Router();
router.get("/:summoner", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summonerName = req.params.summoner;
        if (typeof summonerName !== "string")
            return res.status(400).end();
        const matchesArray = yield matchModel_1.default.find()
            .where("summonerName")
            .equals(summonerName);
        console.log(matchesArray);
        if (matchesArray.length === 0)
            return res.status(200).send([]);
        const body = {
            summonerName: matchesArray[0].summonerName,
            matches: matchesArray[0].matches,
            updatedAt: matchesArray[0].updatedAt,
        };
        return res.status(200).send(body);
    }
    catch (error) {
        console.log(error);
        return res.status(200).send([]);
    }
}));
exports.default = router;
