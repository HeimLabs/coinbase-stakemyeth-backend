import { StakeOptionsMode } from "@coinbase/coinbase-sdk";
import { Request } from "express";

export type NODE_ENV = "development" | "production";

export type Status = "idle" | "loading" | "success" | "fail" | "error";

export type GetStakeableBalanceBody = {
    address: string,
    chainId: number,
    mode: "shared" | "dedicated"
};
export type GetStakeableBalanceRequest = Request<{}, {}, GetStakeableBalanceBody>;