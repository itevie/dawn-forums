import { Router } from "express";
import database from "../../database";
import validate from "../../middleware/validator";
import initPosts from "./posts";

export default function initThreads(): Router {
  const router = Router();
  router.use(
    "/:thread/posts",
    validate({ params: { thread: "thread" } }),
    initPosts()
  );

  // ----- GET -----
  router.get("/", async (req, res) => {
    res.status(200).send(await database.threads.getList());
  });

  router.get(
    "/:thread",
    validate({ params: { thread: "thread" } }),
    async (req, res) => {
      res.status(200).send(await database.threads.get(parseInt(req.params.id)));
    }
  );

  return router;
}
