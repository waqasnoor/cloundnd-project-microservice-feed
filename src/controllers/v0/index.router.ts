import { Router, Request, Response } from "express";
import { FeedRouter } from "./feed/routes/feed.router";

const router: Router = Router();

router.use("/feed", FeedRouter);

export const IndexRouter: Router = router;
