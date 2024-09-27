import { Request } from "express";

export type NODE_ENV = "development" | "production";

export type Status = "idle" | "loading" | "success" | "fail" | "error";

export type App_StakingReward = {
    date: Date,
    address: string,
    amount: number,
    usdValue: number
}

export type App_Validator = {
    id: string,
    status: string,
}

export type GetBalancesQuery = {
    address: string,
    chainId: number,
    mode: "shared" | "dedicated"
};
export type GetBalancesRequest = Request<{}, {}, {}, GetBalancesQuery>;

export type GetRewardsQuery = {
    addresses: string[],
    chainId: number,
    mode: "shared" | "dedicated",
    days: number
};
export type GetRewardsRequest = Request<{}, {}, {}, GetRewardsQuery>;

export type GetValidatorsQuery = {
    address: string,
    chainId: number,
};
export type GetValidatorsRequest = Request<{}, {}, {}, GetValidatorsQuery>;

export type BuildTransactionBody = {
    address: string,
    chainId: number,
    mode: "shared" | "dedicated",
    amount: number
};
export type BuildTransactionRequest = Request<{}, {}, BuildTransactionBody>;