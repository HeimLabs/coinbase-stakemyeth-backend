import { Coinbase } from "@coinbase/coinbase-sdk";

const cb = Coinbase.configureFromJson({ filePath: 'cdp_api_key.json', useServerSigner: true });

export { cb }