import WalletConnect from "@/components/WalletConnect";

export default function Home() {
  return (
    <main className="container">
      <header className="header">
        <h1 className="title">Stellar Mini-dApp</h1>
        <p className="subtitle">Connect your Freighter wallet to explore the Stellar network.</p>
      </header>

      <WalletConnect />

      <footer className="footer">
        <p>Built with Next.js & Stellar Freighter</p>
      </footer>
    </main>
  );
}
