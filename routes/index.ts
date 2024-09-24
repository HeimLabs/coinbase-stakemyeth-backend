import { Router } from "express";
import { errorHandler, healthCheck, notFound } from "../controllers";

const router = Router();

router.get("/", healthCheck);

router.all("*", notFound);

router.use(errorHandler);

export default router;
