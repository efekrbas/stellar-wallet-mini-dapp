import { isConnected, isAllowed, getAddress, setAllowed } from "@stellar/freighter-api";

export async function checkFreighterInstalled() {
    const result = await isConnected();
    return !!result.isConnected;
}

export async function connectFreighterWallet() {
    const status = await isConnected();
    if (!status.isConnected) {
        throw new Error("Freighter wallet is not installed.");
    }

    const allowedStatus = await isAllowed();
    if (!allowedStatus.isAllowed) {
        const setAllowedStatus = await setAllowed();
        if (!setAllowedStatus.isAllowed) {
            throw new Error("Access denied by user.");
        }
    }

    const info = await getAddress();
    if (info.error) {
        throw new Error(info.error);
    }
    return info.address;
}
