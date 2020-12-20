import cors from "cors";
import express from "express";

import { sequelize } from "./sequelize";

import bodyParser from "body-parser";
import { config } from "./config/config";
import { V0_FEED_MODELS } from "./controllers/v0/model.index";
import { FeedRouter } from "./controllers/v0/feed/routes/feed.router";
import { IndexRouter } from "./controllers/v0/index.router";
(async () => {
  await sequelize.addModels(V0_FEED_MODELS);

  await sequelize.sync();

  const app = express();
  const port = process.env.PORT || 8080;

  app.use(bodyParser.json());

  // app.use(
  //   cors({
  //     allowedHeaders: [
  //       "Origin",
  //       "X-Requested-With",
  //       "Content-Type",
  //       "Accept",
  //       "X-Access-Token",
  //       "Authorization",
  //     ],
  //     methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  //     origin: config.url,
  //   })
  // );
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

  app.use("/api/v0/", IndexRouter);

  // Root URI call
  app.get("/health", async (req, res) => {
    res.send("server is live");
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running ${config.url} ${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
