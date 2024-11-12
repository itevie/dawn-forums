import { Router } from "express";
import initApi from "./api/init";

export default function initRoutes(): Router {
  const router = Router();

  router.use("/api", initApi());

  return router;
}
