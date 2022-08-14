import express from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import summonerRouter from "./routes/summoner";
import matchesRouter from "./routes/matches";
import commentsRouter from "./routes/comments";
import spectatorRouter from "./routes/spectator";
import fetchRouter from "./routes/fetch";

dotenv.config();

const app = express();
app.set("port", process.env.PORT || 4000);
mongoose.connect(process.env.MONGODB_URI!, () => {
  console.log("mongodb connected");
});

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/summoner", summonerRouter);
app.use("/comment", commentsRouter);
app.use("/matches", matchesRouter);
app.use("/spectator", spectatorRouter);
app.use("/fetch", fetchRouter);

app.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")}`);
});
