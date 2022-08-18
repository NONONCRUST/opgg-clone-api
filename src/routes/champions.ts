import express, { Request, Response } from "express";
import fs from "fs";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const version = req.params.version || "12.15";
  console.log(version);
  const championsDataJSON = fs
    .readFileSync(`src/data/${version}/champion.json`)
    .toString();

  const championsData = JSON.parse(championsDataJSON);

  const championsObject = championsData.data;

  const championList = Object.keys(championsObject).map(
    (key) => championsObject[key]
  );

  res.status(200).send(championList);
});

router.get("/:champion", async (req: Request, res: Response) => {
  const championName = req.params.champion as string;

  try {
    const version = req.query.version || "12.15";
    const championDataJSON = fs
      .readFileSync(`src/data/${version}/champion/${championName}.json`)
      .toString();

    const champion = JSON.parse(championDataJSON);

    const championData = champion.data[championName];
    return res.status(200).send(championData);
  } catch (error) {
    return res.status(500).end();
  }
});

export default router;
