import express from "express";
import cors from "cors";
import database from "./database";
import { readFileSync } from "fs";
import initRoutes from "./routes/init";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", initRoutes());

app.listen(3000, async () => {
  console.log("Listening on port 3000");

  await database.init(
    __dirname + "/db.db",
    readFileSync(__dirname + "/setup.sql", "utf-8")
  );
});
