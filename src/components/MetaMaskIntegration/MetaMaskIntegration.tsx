import React, { useState, useEffect } from "react";
import { ethers, formatEther, formatUnits } from "ethers";

// MetaMaskWallet component definition
const MetaMaskIntegration: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [ethBalance, setEthBalance] = useState<string>("XX");
  const [usdcBalance, setUsdcBalance] = useState<string>("XX");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);

  // USDC contract address on Ethereum
  const USDC_CONTRACT_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

  // Function to request MetaMask account connection
  const requestAccount = async () => {
    setErrorMessage(""); // Clear any previous error messages

    if (!window.ethereum) {
      setErrorMessage("MetaMask not detected. Please install MetaMask and try again.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" }) as string[];

      if (accounts.length > 0) {
        setWalletAddress(accounts[0]); // Set the wallet address
        setConnected(true); // Update connection status to true
      } else {
        setErrorMessage("No accounts found.");
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "User denied wallet connection");
    }
  };

  // Function to get ETH and USDC balances
  const getBalances = async () => {
    if (!walletAddress || !window.ethereum) return;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);

      // Get ETH balance
      const balance = await provider.getBalance(walletAddress);
      setEthBalance(formatEther(balance));

      // Get USDC balance from the contract
      const usdcContract = new ethers.Contract(
        USDC_CONTRACT_ADDRESS,
        ["function balanceOf(address owner) view returns (uint256)"],
        provider
      );
      const usdcBalance = await usdcContract.balanceOf(walletAddress);
      setUsdcBalance(formatUnits(usdcBalance, 6));
    } catch (error) {
      console.error("Error fetching balances:", error);
      setEthBalance("Error");
      setUsdcBalance("Error");
      setErrorMessage("Failed to retrieve balances. Please try again later.");
    }
  };

  // useEffect to fetch balances when the wallet is connected
  useEffect(() => {
    if (connected && walletAddress) {
      getBalances();
    }
  }, [connected, walletAddress]);

  // Function to initiate wallet connection
  const connectWallet = async () => {
    await requestAccount();
  };

  // Function to disconnect the wallet
  const disconnectWallet = () => {
    setWalletAddress("");
    setConnected(false);
    setEthBalance("XX");
    setUsdcBalance("XX");
  };

  const buttonStyles = connected
    ? 'bg-[#6d6a75] hover:bg-[#5e5a67]' // Light peach for disconnect
    : 'bg-[#6d6a75] hover:bg-[#5e5a67]'  // Grayish brown for connect

  return (
    <div className="mb-4 max-w-lg mx-auto">
      <button
        onClick={connected ? disconnectWallet : connectWallet}
        className={`w-full py-2 px-4 rounded text-white ${buttonStyles} transition-colors duration-150 ease-in-out`}
      >
        {connected ? "Disconnect MetaMask" : "Connect MetaMask"}
      </button>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      {walletAddress && (
        <div className="mt-4 border p-4 rounded-md">
          <p className="font-mono text-sm break-all">
            Address: {walletAddress}
          </p>
          <p className="font-mono text-sm">Balance: {ethBalance} ETH</p>
          <p className="font-mono text-sm">Balance: {usdcBalance} USDC</p>
        </div>
      )}
    </div>
  );
};

export default MetaMaskIntegration;