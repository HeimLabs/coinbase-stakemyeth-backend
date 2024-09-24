import { NextFunction, Response } from "express";
import AppError from "../utils/appError";
import { Coinbase, ExternalAddress, StakeOptionsMode } from "@coinbase/coinbase-sdk";
import { GetStakeableBalanceRequest, GetStakeTransactionRequest } from "../types";
import { CB_MODE, CHAIN_NETWORK } from "../config";

// @todo - DEDICATED_STAKE_ACTIVE env setup

export async function getBalances(req: GetStakeableBalanceRequest, res: Response, next: NextFunction) {
    try {
        const { address, chainId, mode } = req.body;
        const network = CHAIN_NETWORK[chainId];
        const stakeMode = CB_MODE[mode];

        if (!address || !network || !stakeMode)
            throw new AppError(400, "error", "Invalid request");

        const walletAddress = new ExternalAddress(network, address);
        const stakeableBalance = await walletAddress.stakeableBalance(Coinbase.assets.Eth, stakeMode);
        const unstakeableBalance = await walletAddress.unstakeableBalance(Coinbase.assets.Eth, stakeMode);
        const claimableBalance = await walletAddress.claimableBalance(Coinbase.assets.Eth, stakeMode);

        return res.status(200).json({ stakeableBalance, unstakeableBalance, claimableBalance });
    } catch (error) {
        console.error(`[controllers/wallet/getStakeableBalance] Failed to get stakeable balance`);
        console.error(error);
        next(error);
    }
}

export async function buildStakeTransactions(req: GetStakeTransactionRequest, res: Response, next: NextFunction) {
    try {
        const { address, chainId, mode, amount } = req.body;
        const network = CHAIN_NETWORK[chainId];
        const stakeMode = CB_MODE[mode];

        if (!address || !network || !stakeMode || !amount)
            throw new AppError(400, "error", "Invalid request");

        const walletAddress = new ExternalAddress(network, address);

        const stakingOperation = await walletAddress.buildStakeOperation(amount, Coinbase.assets.Eth, stakeMode);
        
        if(stakeMode == StakeOptionsMode.NATIVE) {
            await stakingOperation.wait();
        } 

        const stakeTransactions = stakingOperation.getTransactions().map((tx) => tx.rawTransaction());

        return res.status(200).json({ stakeTransactions });
    } catch (error) {
        console.error(`[controllers/wallet/buildStakeTransactions] Failed to build stake transactions`);
        console.error(error);
        next(error);
    }
}
