import express, { Request, Response } from "express";
import fs from "fs";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const version = req.params.version || "12.15";
  console.log(version);
  const championDataJSON = fs
    .readFileSync(`data/${version}/champion.json`)
    .toString();

  const championData = JSON.parse(championDataJSON);

  const championObject = championData.data;

  const championList = Object.keys(championObject).map(
    (key) => championObject[key]
  );

  res.status(200).send(championList);
});

router.get("/:champion", async (req: Request, res: Response) => {
  const championName = req.params.champion as string;

  const version = req.query.version || "12.15";
  const championDataJSON = fs
    .readFileSync(`data/${version}/champion.json`)
    .toString();

  const championsData = JSON.parse(championDataJSON);

  const championObject = championsData.data;

  const championData = championObject[championName];

  return res.status(200).send(championData);
});

export default router;
