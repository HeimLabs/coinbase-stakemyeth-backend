import { StakeOptionsMode } from "@coinbase/coinbase-sdk";
import { Request } from "express";

export type NODE_ENV = "development" | "production";

export type Status = "idle" | "loading" | "success" | "fail" | "error";

export type GetBalancesBody = {
    address: string,
    chainId: number,
    mode: "shared" | "dedicated"
};
export type GetBalancesRequest = Request<{}, {}, GetBalancesBody>;

export type GetRewardsBody = {
    addresses: string[],
    chainId: number,
    mode: "shared" | "dedicated",
    days: number
};
export type GetRewardsRequest = Request<{}, {}, GetRewardsBody>;

export type BuildTransactionBody = {
    address: string,
    chainId: number,
    mode: "shared" | "dedicated",
    amount: number
};
export type BuildTransactionRequest = Request<{}, {}, BuildTransactionBody>;