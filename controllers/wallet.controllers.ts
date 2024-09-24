import { NextFunction, Response } from "express";
import AppError from "../utils/appError";
import { Coinbase, ExternalAddress, StakeOptionsMode } from "@coinbase/coinbase-sdk";
import { GetStakeableBalanceRequest } from "../types";
import { CHAIN_NETWORK } from "../config";

export async function getStakeableBalance(req: GetStakeableBalanceRequest, res: Response, next: NextFunction) {
    try {
        const { address, chainId } = req.body;
        const network = CHAIN_NETWORK[chainId];

        if (!address || !chainId || !network)
            throw new AppError(400, "error", "Invalid request");

        console.log(network);
        const _address = new ExternalAddress(network, address);
        const stakeableBalance = await _address.stakeableBalance(Coinbase.assets.Eth, StakeOptionsMode.PARTIAL);

        return res.status(200).json({ stakeableBalance });
    } catch (error) {
        console.error(`[controllers/wallet/getStakeableBalance] Failed to get stakeable balance`);
        console.error(error);
        next(error);
    }
}

