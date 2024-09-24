import { NextFunction, Response } from "express";
import AppError from "../utils/appError";
import { Coinbase, ExternalAddress, StakeOptionsMode } from "@coinbase/coinbase-sdk";
import { GetStakeableBalanceRequest } from "../types";
import { CB_MODE, CHAIN_NETWORK } from "../config";

export async function getStakeableBalance(req: GetStakeableBalanceRequest, res: Response, next: NextFunction) {
    try {
        const { address, chainId, mode } = req.body;
        const network = CHAIN_NETWORK[chainId];
        const stakeMode = CB_MODE[mode];

        if (!address || !network || !stakeMode)
            throw new AppError(400, "error", "Invalid request");

        const walletAddress = new ExternalAddress(network, address);
        const stakeableBalance = await walletAddress.stakeableBalance(Coinbase.assets.Eth, stakeMode);

        return res.status(200).json({ stakeableBalance });
    } catch (error) {
        console.error(`[controllers/wallet/getStakeableBalance] Failed to get stakeable balance`);
        console.error(error);
        next(error);
    }
}

