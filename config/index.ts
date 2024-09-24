import { Coinbase } from "@coinbase/coinbase-sdk";

export const CHAIN_NETWORK: { [key: number]: string } = {
    1: Coinbase.networks.EthereumMainnet,
    17000: Coinbase.networks.EthereumHolesky
}