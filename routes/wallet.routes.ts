import { Router } from "express";
import { getBalances, buildStakeTransactions } from "../controllers";

const walletRouter = Router();

walletRouter.get("/balances", getBalances);
walletRouter.post("/stake/build", buildStakeTransactions);

export default walletRouter;
