import { Router } from "express";
import database from "../../database";
import validate from "../../middleware/validator";
import { JTDDataType } from "ajv/dist/core";
import { validateLengths } from "../../util";
import { options } from "../..";

const createPostSchema = {
  properties: {
    title: { type: "string" },
    body: { type: "string" },
  },
} as const;

export default function initThreads(): Router {
  const router = Router();

  // ----- GET -----
  router.get("/", async (req, res) => {
    res.status(200).send(await database.threads.getList());
  });

  router.get<{ thread: string }>(
    "/:thread",
    validate({ params: { thread: "thread" } }),
    async (req, res) => {
      res
        .status(200)
        .send(await database.threads.get(parseInt(req.params.thread)));
    }
  );

  // ----- POSTS -----
  router.get<{ thread: string }>(
    "/:thread/posts",
    validate({ params: { thread: "thread" } }),
    async (req, res) => {
      res
        .status(200)
        .send(await database.posts.getList(parseInt(req.params.thread)));
    }
  );

  router.post<{ thread: string }, any, JTDDataType<typeof createPostSchema>>(
    "/:thread/posts",
    validate({ body: createPostSchema, params: { thread: "thread" } }),
    async (req, res) => {
      if (validateLengths(req.body.title, options.posts?.title)) {
        res.status(400).send({
          message: validateLengths(
            req.body.title,
            options.posts?.title,
            "Title"
          ),
        });
        return;
      }

      if (validateLengths(req.body.body, options.posts?.body)) {
        res.status(400).send({
          message: validateLengths(req.body.body, options.posts?.body, "Body"),
        });
        return;
      }

      const post = await database.posts.create(
        1,
        parseInt(req.params.thread),
        req.body.title,
        req.body.body
      );

      res.status(200).send(post);
    }
  );

  return router;
}
