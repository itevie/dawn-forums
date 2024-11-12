import { Router } from "express";

export default function initComments(): Router {
  const router = Router();

  router.get("/comments", (req, res) => {});

  return router;
}
