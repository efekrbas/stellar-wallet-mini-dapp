"use client";

import { useState, useEffect } from "react";
import { checkFreighterInstalled, connectFreighterWallet } from "@/utils/freighter";
import { getAccountBalance } from "@/utils/stellar";

export default function WalletConnect() {
    const [publicKey, setPublicKey] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isFreighterInstalled, setIsFreighterInstalled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const init = async () => {
            const installed = await checkFreighterInstalled();
            setIsFreighterInstalled(installed);
        };
        init();
    }, []);

    const fetchBalance = async (key: string) => {
        try {
            setIsLoading(true);
            const xlmBalance = await getAccountBalance(key);
            setBalance(xlmBalance);
        } catch (err: any) {
            setError("Failed to fetch balance. Is your account funded on Testnet?");
        } finally {
            setIsLoading(false);
        }
    };

    const handleConnect = async () => {
        try {
            setError(null);
            setIsLoading(true);
            const key = await connectFreighterWallet();
            setPublicKey(key);
            await fetchBalance(key);
        } catch (err: any) {
            console.error("Connection error:", err);
            setError(err.message || "Failed to connect to Freighter.");
        } finally {
            setIsLoading(false);
        }
    };

    const disconnectWallet = () => {
        setPublicKey(null);
        setBalance(null);
        setError(null);
    };

    if (!isFreighterInstalled) {
        return (
            <div className="card shadow">
                <p className="error-msg">Please install the Freighter browser extension to continue.</p>
                <a
                    href="https://www.freighter.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-link"
                >
                    Download Freighter
                </a>
            </div>
        );
    }

    return (
        <div className="card shadow">
            {!publicKey ? (
                <button
                    className="btn-primary"
                    onClick={handleConnect}
                    disabled={isLoading}
                >
                    {isLoading ? "Connecting..." : "Connect Freighter Wallet"}
                </button>
            ) : (
                <div className="wallet-info">
                    <div className="stack">
                        <p className="label">Public Key</p>
                        <p className="public-key">{publicKey}</p>
                    </div>

                    <div className="stack" style={{ marginTop: '1.5rem' }}>
                        <p className="label">XLM Balance (Testnet)</p>
                        <div className="balance-container">
                            {isLoading ? (
                                <p className="loading">Fetching balance...</p>
                            ) : (
                                <p className="balance">{balance} XLM</p>
                            )}
                        </div>
                        {balance === "0" && (
                            <p className="tip">
                                Tip: If your balance is 0, use <a href="https://laboratory.stellar.org/#friendbot" target="_blank" className="btn-link">Friendbot</a> to fund your Testnet account.
                            </p>
                        )}
                    </div>

                    <div className="btn-group">
                        <button
                            className="btn-secondary"
                            onClick={() => fetchBalance(publicKey)}
                            disabled={isLoading}
                        >
                            Refresh Balance
                        </button>
                        <button className="btn-secondary danger" onClick={disconnectWallet}>
                            Disconnect
                        </button>
                    </div>
                </div>
            )}
            {error && <p className="error-msg">{error}</p>}
        </div>
    );
}
