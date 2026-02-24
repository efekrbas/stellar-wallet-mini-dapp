"use client";

import { useState, useEffect } from "react";
import { isConnected, isAllowed, getAddress, setAllowed } from "@stellar/freighter-api";

export default function WalletConnect() {
    const [publicKey, setPublicKey] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isFreighterInstalled, setIsFreighterInstalled] = useState<boolean>(false);

    useEffect(() => {
        const checkFreighter = async () => {
            const result = await isConnected();
            setIsFreighterInstalled(!!result.isConnected);
        };
        checkFreighter();
    }, []);

    const connectWallet = async () => {
        try {
            setError(null);

            const status = await isConnected();
            if (!status.isConnected) {
                setError("Freighter wallet is not installed.");
                return;
            }

            // Check if allowed
            const allowedStatus = await isAllowed();
            if (!allowedStatus.isAllowed) {
                const setAllowedStatus = await setAllowed();
                if (!setAllowedStatus.isAllowed) {
                    setError("Access denied by user.");
                    return;
                }
            }

            const info = await getAddress();
            if (info.error) {
                setError(info.error);
                return;
            }
            setPublicKey(info.address);
        } catch (err: any) {
            console.error("Connection error:", err);
            setError(err.message || "Failed to connect to Freighter.");
        }
    };

    const disconnectWallet = () => {
        setPublicKey(null);
    };

    if (!isFreighterInstalled) {
        return (
            <div className="card shadow">
                <p className="error">Please install the Freighter browser extension to continue.</p>
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
                <button className="btn-primary" onClick={connectWallet}>
                    Connect Freighter Wallet
                </button>
            ) : (
                <div className="wallet-info">
                    <p className="label">Connected Wallet:</p>
                    <p className="public-key">{publicKey}</p>
                    <button className="btn-secondary" onClick={disconnectWallet}>
                        Disconnect
                    </button>
                </div>
            )}
            {error && <p className="error-msg">{error}</p>}
        </div>
    );
}
