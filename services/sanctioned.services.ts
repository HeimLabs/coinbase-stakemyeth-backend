import axios from 'axios';
import fs from 'fs';
import cron from 'node-cron';

export const SANCITIONED_JSON_URL = 'https://raw.githubusercontent.com/0xB10C/ofac-sanctioned-digital-currency-addresses/lists/sanctioned_addresses_ETH.json';
export const SANCTIONED_FILE_PATH = 'sanctioned_addresses_ETH.json';

export const setupOFACSanctionList = async () => {
    try {
        console.log('[services/sanctioned/setupOFACSanctionList] Downloading...');
        const response = await axios.get(SANCITIONED_JSON_URL, { responseType: 'stream' });
        const writer = fs.createWriteStream(SANCTIONED_FILE_PATH);
        response.data.pipe(writer);
        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
        console.log('[services/sanctioned/setupOFACSanctionList] Done');
    } catch (error) {
        console.error('[services/sanctioned/setupOFACSanctionList] Error fetching sanctioned addresses:', error);
    }
}

export const loadSanctionedAddresses = async (): Promise<string[]> => {
    const data = fs.readFileSync(SANCTIONED_FILE_PATH, 'utf8');
    return JSON.parse(data);
};

export const setupSanctionCron = () => {
    cron.schedule('0 0 * * *', () => {
        try {
            console.log('[services/sanctioned/cron] Running...');
            setupOFACSanctionList();
        } catch (err) {
            console.error('[services/sanctioned/cron] Failed: ', err);
        }
    });
}

