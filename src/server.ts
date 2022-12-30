import express, { Request, Response, NextFunction } from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./module/auth";
import { createNewUser, signin } from "./handlers/user";
import { errorHandler, handleInputErrors } from "./module/middleware";
import validator from './lib/validation'

const customMiddleWare =
  (message: string) => (req: Request, res: Response, next: NextFunction) => {
    console.log(`hello from ${message}`);
    next();
  };

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(customMiddleWare("our team"));
app.use("/api", protect, router);
app.use(
  "/user",
  validator.validate('user', 'post'),
  handleInputErrors,
  createNewUser
);
app.use("/signin", signin);

app.use(errorHandler);

export default app;
