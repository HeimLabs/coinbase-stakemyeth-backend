import { NextFunction, Response } from "express";
import AppError from "../utils/appError";
import { Coinbase, ExternalAddress, StakeOptionsMode, StakingReward, Validator } from "@coinbase/coinbase-sdk";
import { GetBalancesRequest, GetRewardsRequest, BuildTransactionRequest, GetValidatorsRequest, App_StakingReward, App_Validator } from "../types";
import { CB_MODE, CHAIN_NETWORK } from "../config";

// @todo - DEDICATED_STAKE_ACTIVE env setup

export async function getBalances(req: GetBalancesRequest, res: Response, next: NextFunction) {
    try {
        const { address, chainId, mode } = req.query;
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
        console.error(`[controllers/wallet/getBalances] Failed to get balances`);
        console.error(error);
        next(error);
    }
}

export async function getRewards(req: GetRewardsRequest, res: Response, next: NextFunction) {
    try {
        const { addresses, chainId, mode, days } = req.query;
        const network = CHAIN_NETWORK[chainId];
        const stakeMode = CB_MODE[mode];

        if (!addresses || addresses.length == 0 || !network || !stakeMode || !days)
            throw new AppError(400, "error", "Invalid request");

        let stakingRewards: StakingReward[] | App_StakingReward[] = [];

        let to = new Date();
        let from = new Date();
        from.setDate(to.getDate() - days);

        if (stakeMode == StakeOptionsMode.PARTIAL) {
            const walletAddress = new ExternalAddress(network, addresses[0]);
            stakingRewards = await walletAddress
                .stakingRewards(Coinbase.assets.Eth, from.toISOString(), to.toISOString());
        }
        else if (stakeMode == StakeOptionsMode.NATIVE) {
            const validators = (await Validator.list(network, Coinbase.assets.Eth)).map((v) => v.getValidatorId());
            stakingRewards = await StakingReward
                .list(network, Coinbase.assets.Eth, validators, from.toISOString(), to.toISOString());
            const walletAddress = new ExternalAddress(network, addresses[0]);
            stakingRewards = await walletAddress.stakingRewards(Coinbase.assets.Eth, stakeMode);
        }

        stakingRewards = (stakingRewards as StakingReward[]).map((reward) => ({
            date: reward.date(),
            address: reward.addressId(),
            amount: Number(reward.amount().toString()),
            usdValue: Number(reward.usdValue().toString())
        }));

        return res.status(200).json({ stakingRewards });
    } catch (error) {
        console.error(`[controllers/wallet/getRewards] Failed to get rewards`);
        console.error(error);
        next(error);
    }
}

export async function getValidators(req: GetValidatorsRequest, res: Response, next: NextFunction) {
    try {
        const { address, chainId } = req.query;
        const network = CHAIN_NETWORK[chainId];

        if (!address || !network)
            throw new AppError(400, "error", "Invalid request");

        let validators: Validator[] | App_Validator[] = await Validator.list(network, Coinbase.assets.Eth);

        validators = validators.map((validator) => ({
            id: validator.getValidatorId(),
            status: validator.getStatus()
        }));

        return res.status(200).json({ validators });
    } catch (error) {
        console.error(`[controllers/wallet/getValidators] Failed to get validators`);
        console.error(error);
        next(error);
    }
}

export async function buildStakeTransactions(req: BuildTransactionRequest, res: Response, next: NextFunction) {
    try {
        const { address, chainId, mode, amount } = req.body;
        const network = CHAIN_NETWORK[chainId];
        const stakeMode = CB_MODE[mode];

        if (!address || !network || !stakeMode || !amount)
            throw new AppError(400, "error", "Invalid request");

        const walletAddress = new ExternalAddress(network, address);

        const stakeOperation = await walletAddress.buildStakeOperation(amount, Coinbase.assets.Eth, stakeMode);

        if (stakeMode == StakeOptionsMode.NATIVE) {
            await stakeOperation.wait();
        }

        const transactions = stakeOperation.getTransactions().map((tx) => tx.rawTransaction().toJSON());

        return res.status(200).json({ transactions });
    } catch (error) {
        console.error(`[controllers/wallet/buildStakeTransactions] Failed to build stake transactions`);
        console.error(error);
        next(error);
    }
}

export async function buildUnstakeTransactions(req: BuildTransactionRequest, res: Response, next: NextFunction) {
    try {
        const { address, chainId, mode, amount } = req.body;
        const network = CHAIN_NETWORK[chainId];
        const stakeMode = CB_MODE[mode];

        if (!address || !network || !stakeMode || !amount)
            throw new AppError(400, "error", "Invalid request");

        const walletAddress = new ExternalAddress(network, address);

        const unstakeOperation = await walletAddress.buildUnstakeOperation(amount, Coinbase.assets.Eth, stakeMode);

        if (stakeMode == StakeOptionsMode.NATIVE) {
            await unstakeOperation.wait();
            return res.status(200).json("Unstake successful!");
        }

        const transactions = unstakeOperation.getTransactions().map((tx) => tx.rawTransaction().toJSON());

        return res.status(200).json({ transactions });
    } catch (error) {
        console.error(`[controllers/wallet/buildUnstakeTransactions] Failed to build unstake transactions`);
        console.error(error);
        next(error);
    }
}

export async function buildClaimTransactions(req: BuildTransactionRequest, res: Response, next: NextFunction) {
    try {
        const { address, chainId, amount } = req.body;
        const network = CHAIN_NETWORK[chainId];

        if (!address || !network || !amount)
            throw new AppError(400, "error", "Invalid request");

        const walletAddress = new ExternalAddress(network, address);

        const claimOperation = await walletAddress.buildClaimStakeOperation(amount, Coinbase.assets.Eth, StakeOptionsMode.PARTIAL);

        const transactions = claimOperation.getTransactions().map((tx) => tx.rawTransaction().toJSON());

        return res.status(200).json({ transactions });
    } catch (error) {
        console.error(`[controllers/wallet/buildClaimTransactions] Failed to build claim transactions`);
        console.error(error);
        next(error);
    }
}
