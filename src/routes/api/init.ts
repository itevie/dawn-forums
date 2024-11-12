import { Router } from "express";
import initThreads from "./threads";

export default function initApi(): Router {
  const router = Router();

  router.use("/threads", initThreads());

  return router;
}
