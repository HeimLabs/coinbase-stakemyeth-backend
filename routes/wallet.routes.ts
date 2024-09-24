import { Router } from "express";
import { getStakeableBalance } from "../controllers";

const walletRouter = Router();

walletRouter.get("/stakeable-balance", getStakeableBalance);

export default walletRouter;
