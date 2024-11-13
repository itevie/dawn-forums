import { Router } from "express";
import database from "../../database";
import { JTDDataType } from "ajv/dist/core";
import validate from "../../middleware/validator";

const updatePostSchema = {
  optionalProperties: {
    title: { type: "string" },
    body: { type: "string" },
  },
} as const;

export default function initPosts(): Router {
  const router = Router({
    mergeParams: true,
  });

  router.get<{ post: string }>(
    "/:post",
    validate({ params: { post: "post" } }),
    async (req, res) => {
      res.status(200).send(await database.posts.get(parseInt(req.params.post)));
    }
  );

  router.patch<{ post: string }, any, JTDDataType<typeof updatePostSchema>>(
    "/:post",
    validate({ body: updatePostSchema, params: { post: "post" } }),
    async (req, res) => {
      if (req.body.title) {
        await database.posts.update(
          parseInt(req.params.post),
          "title",
          req.body.title
        );
      }

      if (req.body.body) {
        await database.posts.update(
          parseInt(req.params.post),
          "body",
          req.body.body
        );
      }

      res.status(200).send(await database.posts.get(parseInt(req.params.post)));
    }
  );

  return router;
}
