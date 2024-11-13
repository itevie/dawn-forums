import { Router } from "express";
import database from "../../database";
import validate from "../../middleware/validator";

export default function initUsers(): Router {
  const router = Router();

  router.get<{ user: string }>(
    "/:user",
    validate({ params: { user: "user" } }),
    async (req, res) => {
      res.status(200).send(await database.users.get(parseInt(req.params.user)));
    }
  );

  return router;
}
