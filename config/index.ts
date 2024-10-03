import { Coinbase, StakeOptionsMode } from "@coinbase/coinbase-sdk";

export const CHAIN_NETWORK: { [key: number]: string } = {
    1: Coinbase.networks.EthereumMainnet,
    17000: Coinbase.networks.EthereumHolesky
}

export const CB_MODE = {
    "shared": StakeOptionsMode.PARTIAL,
    "dedicated": StakeOptionsMode.NATIVE
}

export const CHAIN_RPC: { [key: number]: string } = {
    1: "https://eth.llamarpc.com",
    17000: "https://1rpc.io/holesky"
}