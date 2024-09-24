import { Coinbase } from "@coinbase/coinbase-sdk";

const setupCoinbase = () => {
    Coinbase.configureFromJson({ filePath: 'cdp_api_key.json', useServerSigner: true });
}


export { setupCoinbase }