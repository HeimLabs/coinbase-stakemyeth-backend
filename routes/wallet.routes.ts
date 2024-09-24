import { Router } from "express";
import { getStakeableBalance, buildStakeTransactions } from "../controllers";

const walletRouter = Router();

walletRouter.get("/stakeable-balance", getStakeableBalance);
walletRouter.post("/stake/build", buildStakeTransactions);

export default walletRouter;
