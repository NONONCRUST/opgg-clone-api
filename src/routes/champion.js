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
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const version = req.params.version || "12.15";
    console.log(version);
    const championDataJSON = fs_1.default
        .readFileSync(`data/${version}/champion.json`)
        .toString();
    const championData = JSON.parse(championDataJSON);
    const championObject = championData.data;
    const championList = Object.keys(championObject).map((key) => championObject[key]);
    res.status(200).send(championList);
}));
router.get("/:champion", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const championName = req.params.champion;
    const version = req.query.version || "12.15";
    const championDataJSON = fs_1.default
        .readFileSync(`data/${version}/champion.json`)
        .toString();
    const championsData = JSON.parse(championDataJSON);
    const championObject = championsData.data;
    const championData = championObject[championName];
    return res.status(200).send(championData);
}));
exports.default = router;
