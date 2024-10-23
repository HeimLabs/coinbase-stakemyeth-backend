import { Router } from "express";
import { getBalances, getRewards, getValidators, buildStakeTransactions, buildUnstakeTransactions, buildClaimTransactions } from "../controllers";
import { blockSanctioned } from "../middlewares/sanctioned.middlewares";

const walletRouter = Router();

walletRouter.use(blockSanctioned);
walletRouter.get("/balances", getBalances);
walletRouter.get("/rewards", getRewards);
walletRouter.get("/validators", getValidators);
walletRouter.post("/stake", buildStakeTransactions);
walletRouter.post("/unstake", buildUnstakeTransactions);
walletRouter.post("/claim", buildClaimTransactions);

export default walletRouter;
