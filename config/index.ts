import { Coinbase, StakeOptionsMode } from "@coinbase/coinbase-sdk";

export const CHAIN_NETWORK: { [key: number]: string } = {
    1: Coinbase.networks.EthereumMainnet,
    560048: Coinbase.networks.EthereumHoodi
}

export const CB_MODE = {
    "shared": StakeOptionsMode.PARTIAL,
    "dedicated": StakeOptionsMode.NATIVE
}

export const CHAIN_RPC: { [key: number]: string } = {
    1: "https://eth.llamarpc.com",
    560048: "https://0xrpc.io/hoodi"
}