import { Horizon } from "stellar-sdk";

// Initialize Horizon server
const SERVER_URL = process.env.NEXT_PUBLIC_HORIZON_URL || "https://horizon-testnet.stellar.org";
const server = new Horizon.Server(SERVER_URL);

/**
 * Fetch the XLM balance of a given public key on the Testnet.
 * @param publicKey The public key to fetch the balance for.
 * @returns The XLM balance as a string or null if not found.
 */
export async function getAccountBalance(publicKey: string): Promise<string | null> {
    try {
        const account = await server.loadAccount(publicKey);
        const xlmBalance = account.balances.find((balance) => balance.asset_type === "native");
        return xlmBalance ? xlmBalance.balance : "0";
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            // Account not found (possibly not funded on Testnet)
            return "0";
        }
        console.error("Error fetching balance:", error);
        throw new Error("Failed to fetch balance from Horizon.");
    }
}
