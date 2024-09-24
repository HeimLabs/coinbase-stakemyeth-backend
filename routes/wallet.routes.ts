import { Router } from "express";
import { getBalances, buildStakeTransactions, buildUnstakeTransactions, buildClaimTransactions } from "../controllers";

const walletRouter = Router();

walletRouter.get("/balances", getBalances);
walletRouter.post("/stake", buildStakeTransactions);
walletRouter.post("/unstake", buildUnstakeTransactions);
walletRouter.post("/claim", buildClaimTransactions);

export default walletRouter;
