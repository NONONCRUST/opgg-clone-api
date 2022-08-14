"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const summoner_1 = __importDefault(require("./routes/summoner"));
const matches_1 = __importDefault(require("./routes/matches"));
const comments_1 = __importDefault(require("./routes/comments"));
const spectator_1 = __importDefault(require("./routes/spectator"));
const fetch_1 = __importDefault(require("./routes/fetch"));
const champion_1 = __importDefault(require("./routes/champion"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.set("port", process.env.PORT || 4000);
mongoose_1.default.connect(process.env.MONGODB_URI, () => {
    console.log("mongodb connected");
});
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/champions", champion_1.default);
app.use("/summoner", summoner_1.default);
app.use("/comments", comments_1.default);
app.use("/matches", matches_1.default);
app.use("/spectator", spectator_1.default);
app.use("/fetch", fetch_1.default);
app.listen(app.get("port"), () => {
    console.log(`http://localhost:${app.get("port")}`);
});
