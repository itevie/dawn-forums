import { Router } from "express";
import initThreads from "./threads";
import initPosts from "./posts";

export default function initApi(): Router {
  const router = Router();

  router.use("/threads", initThreads());
  router.use("/posts", initPosts());

  return router;
}
