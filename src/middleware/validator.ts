import { Request, Response, NextFunction, RequestHandler } from "express";
import database from "../database";
import Ajv from "ajv/dist/jtd";
const ajv = new Ajv();

interface ValidationOptions {
  params?: { [key: string]: "thread" | "post" | "user" };
  body?: any;
}

export default function validate(options: ValidationOptions) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Check parameters
    if (options.params) {
      for (const param in options.params) {
        // Check if it exists
        if (!req.params[param]) {
          res.status(400).send({
            message: `Invalid parameter :${param}`,
          });
          return;
        }

        let actualParam = req.params[param];

        // Check type
        switch (options.params[param]) {
          case "thread":
            if (
              !parseInt(actualParam) ||
              !(await database.threads.get(parseInt(actualParam)))
            ) {
              res.status(404).send({
                message: `Thread ${actualParam} does not exist`,
              });
              return;
            }
            break;
          case "post":
            if (
              !parseInt(actualParam) ||
              !(await database.posts.get(parseInt(actualParam)))
            ) {
              res.status(404).send({
                message: `Post ${actualParam} does not exist`,
              });
              return;
            }
            break;
          case "user":
            if (
              !parseInt(actualParam) ||
              !(await database.users.get(parseInt(actualParam)))
            ) {
              res.status(404).send({
                message: `User ${actualParam} does not exist`,
              });
              return;
            }
            break;
        }
      }
    }

    if (options.body) {
      const validate = ajv.compile(options.body);

      if (!validate(req.body)) {
        res.status(400).send({
          message: "Invalid body",
          errors: validate.errors,
        });
        return;
      }
    }

    next();
  };
}
