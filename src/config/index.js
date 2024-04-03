import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:5173";

export const runConfig = (app) => {
  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: FRONTEND_URL,
      optionsSuccessStatus: 200,
    })
  );
  app.use(express.json());
  app.use(logger("dev"));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
