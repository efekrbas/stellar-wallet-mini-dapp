import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import WalletConnect from "@/components/WalletConnect";
import * as freighterUtils from "@/utils/freighter";
import * as stellarUtils from "@/utils/stellar";

// Mock the utilities
jest.mock("@/utils/freighter");
jest.mock("@/utils/stellar");

describe("WalletConnect Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (freighterUtils.checkFreighterInstalled as jest.Mock).mockResolvedValue(true);
    });

    test("renders Connect Wallet button initially", async () => {
        render(<WalletConnect />);

        await waitFor(() => {
            expect(screen.getByText(/Connect Freighter Wallet/i)).toBeInTheDocument();
        });
    });

    test("does not show balance when wallet is not connected", async () => {
        render(<WalletConnect />);

        await waitFor(() => {
            expect(screen.queryByText(/XLM Balance/i)).not.toBeInTheDocument();
        });
    });

    test("shows public key after successful connection", async () => {
        const mockPublicKey = "GCB3H45V6...EXAMPLE";
        const mockBalance = "100.0";

        (freighterUtils.connectFreighterWallet as jest.Mock).mockResolvedValue(mockPublicKey);
        (stellarUtils.getAccountBalance as jest.Mock).mockResolvedValue(mockBalance);

        render(<WalletConnect />);

        const connectButton = await screen.findByText(/Connect Freighter Wallet/i);
        fireEvent.click(connectButton);

        await waitFor(() => {
            expect(screen.getByText(mockPublicKey)).toBeInTheDocument();
            expect(screen.getByText(`${mockBalance} XLM`)).toBeInTheDocument();
        });
    });
});
