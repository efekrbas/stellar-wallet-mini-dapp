import { checkFreighterInstalled, connectFreighterWallet } from "@/utils/freighter";
import * as freighterApi from "@stellar/freighter-api";

jest.mock("@stellar/freighter-api");

describe("Freighter Utility", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("checkFreighterInstalled returns true when isConnected is true", async () => {
        (freighterApi.isConnected as jest.Mock).mockResolvedValue({ isConnected: true });
        const result = await checkFreighterInstalled();
        expect(result).toBe(true);
    });

    test("connectFreighterWallet returns address on success", async () => {
        const mockAddress = "GCB3H45V6...EXAMPLE";
        (freighterApi.isConnected as jest.Mock).mockResolvedValue({ isConnected: true });
        (freighterApi.isAllowed as jest.Mock).mockResolvedValue({ isAllowed: true });
        (freighterApi.getAddress as jest.Mock).mockResolvedValue({ address: mockAddress });

        const result = await connectFreighterWallet();
        expect(result).toBe(mockAddress);
    });

    test("connectFreighterWallet throws error when not installed", async () => {
        (freighterApi.isConnected as jest.Mock).mockResolvedValue({ isConnected: false });
        await expect(connectFreighterWallet()).rejects.toThrow("Freighter wallet is not installed.");
    });

    test("connectFreighterWallet throws error when access denied", async () => {
        (freighterApi.isConnected as jest.Mock).mockResolvedValue({ isConnected: true });
        (freighterApi.isAllowed as jest.Mock).mockResolvedValue({ isAllowed: false });
        (freighterApi.setAllowed as jest.Mock).mockResolvedValue({ isAllowed: false });

        await expect(connectFreighterWallet()).rejects.toThrow("Access denied by user.");
    });

    test("connectFreighterWallet throws error when getAddress returns error", async () => {
        (freighterApi.isConnected as jest.Mock).mockResolvedValue({ isConnected: true });
        (freighterApi.isAllowed as jest.Mock).mockResolvedValue({ isAllowed: true });
        (freighterApi.getAddress as jest.Mock).mockResolvedValue({ error: "External Error" });

        await expect(connectFreighterWallet()).rejects.toThrow("External Error");
    });
});
