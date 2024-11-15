import { Router } from "express";
import initThreads from "./threads";
import initPosts from "./posts";
import initUsers from "./users";

export default function initApi(): Router {
  const router = Router();

  router.use("/threads", initThreads());
  router.use("/posts", initPosts());
  router.use("/users", initUsers());

  return router;
}
