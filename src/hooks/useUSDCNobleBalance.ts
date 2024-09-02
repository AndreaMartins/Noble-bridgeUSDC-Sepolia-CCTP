import { useState, useEffect } from "react";
import { StargateClient } from "@cosmjs/stargate";
import {
  NOBLE_RPC_URL,
  NOBLE_COIN_MINIMAL_DENOM,
} from "../configs/noble-testnet-config";

export const useUSDCNobleBalance = (nobleAddress: string) => {
  const [usdcBalance, setUsdcBalance] = useState<string>("XX");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNobleBalance = async (address: string) => {
      try {
        const client = await StargateClient.connect(NOBLE_RPC_URL);
        // console.log("Connected to Stargate client");

        const balance = await client.getBalance(
          address,
          NOBLE_COIN_MINIMAL_DENOM
        );
        // console.log("Fetched balance:", balance);

        const amountInUSDC = (Number(balance.amount) / 1e6).toFixed(0);
        // console.log("Amount in USDC:", amountInUSDC);

        setUsdcBalance(amountInUSDC);
        setError(null);
      } catch (error) {
        // console.error("Error fetching balance:", error);
        setError("Failed to fetch balance. Please try again later.");
      }
    };

    if (nobleAddress) {
      // console.log("Fetching balance for address:", nobleAddress);
      fetchNobleBalance(nobleAddress);
    }
  }, [nobleAddress]);

  return { usdcBalance, error };
};
