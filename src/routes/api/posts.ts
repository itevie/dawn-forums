import { Router } from "express";
import database from "../../database";
import { JTDDataType } from "ajv/dist/core";
import validate from "../../middleware/validator";
import { validateLengths } from "../../util";
import { options } from "../..";

const updatePostSchema = {
  optionalProperties: {
    title: { type: "string" },
    body: { type: "string" },
  },
} as const;

const createCommentSchema = {
  properties: {
    body: { type: "string" },
  },
} as const;

export default function initPosts(): Router {
  const router = Router({
    mergeParams: true,
  });

  // ----- Post -----
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

  // ----- Post Comments -----
  router.get<{ post: string }>(
    "/:post/comments",
    validate({ params: { post: "post" } }),
    async (req, res) => {
      res
        .status(200)
        .send(await database.comments.getFor(parseInt(req.params.post)));
    }
  );

  router.post<{ post: string }, any, JTDDataType<typeof createCommentSchema>>(
    "/:post/comments",
    validate({ params: { post: "post" }, body: createCommentSchema }),
    async (req, res) => {
      if (validateLengths(req.body.body, options.comments?.body, "Body")) {
        res.status(400).send({
          message: validateLengths(
            req.body.body,
            options.comments?.body,
            "Body"
          ),
        });
        return;
      }

      const comment = await database.comments.create(
        parseInt(req.params.post),
        1,
        req.body.body
      );
      res.status(200).send(comment);
    }
  );

  return router;
}
