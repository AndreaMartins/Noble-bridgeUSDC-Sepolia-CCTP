import {
  Registry,
  GeneratedType,
} from "@cosmjs/proto-signing";
import { SigningStargateClient } from "@cosmjs/stargate";
import { MsgDepositForBurn } from "../../generated/tx";
import { Buffer } from "buffer";
import { NOBLE_RPC_URL, NOBLE_CHAIN_ID } from "../configs/noble-testnet-config";

// Ensure Buffer is available globally if needed
window.Buffer = window.Buffer || Buffer;

// Define the types for Circle's CCTP messages
export const cctpTypes: ReadonlyArray<[string, GeneratedType]> = [
  ["/circle.cctp.v1.MsgDepositForBurn", MsgDepositForBurn],
];

// Create a registry with CCTP message types
function createDefaultRegistry(): Registry {
  return new Registry(cctpTypes);
}

// Function to burn USDC on the Noble blockchain
export const burnUSDCOnNoble = async (
  nobleAddress: string,
  amount: number,
  ethRecipientAddress: string
) => {
  try {
    if (!window.getOfflineSigner) {
      throw new Error("Wallet extension not found or not accessible");
    }

    const offlineSigner = window.getOfflineSigner(NOBLE_CHAIN_ID);
    const accounts = await offlineSigner.getAccounts();
    const [account] = accounts;

    if (!account) {
      throw new Error("Failed to retrieve account from wallet");
    }

    console.log("Noble Address:", nobleAddress);
    console.log("Account Address:", account.address);

    const client = await SigningStargateClient.connectWithSigner(
      NOBLE_RPC_URL,
      offlineSigner,
      { registry: createDefaultRegistry() }
    );
    console.log("Client connected");

    const cleanedMintRecipient = ethRecipientAddress.replace(/^0x/, "");
    const mintRecipient = cleanedMintRecipient.padStart(64, "0");
    const buffer = Buffer.from(mintRecipient, "hex");
    const mintRecipientBytes = new Uint8Array(buffer);
    console.log("Mint recipient bytes:", mintRecipientBytes);

    const msg = {
      typeUrl: "/circle.cctp.v1.MsgDepositForBurn",
      value: {
        from: account.address,
        amount: amount.toString(),
        destinationDomain: 0, // Verify the correct value for this field
        mintRecipient: mintRecipientBytes,
        burnToken: "uusdc",
      },
    };
    console.log("Message prepared:", msg);

    const fee = {
      amount: [
        {
          denom: "uusdc",
          amount: "200", // Transaction fee amount
        },
      ],
      gas: "300000", // Gas limit
    };
    const memo = "";
    console.log("Transaction fee:", fee);

    const result = await client.signAndBroadcast(
      account.address,
      [msg],
      fee,
      memo
    );
    console.log("Transaction result:", result);

    if (result.code !== 0) {
      return {
        txHash: result.transactionHash || null,
        error: `Transaction failed with code ${result.code}: ${result.rawLog}`,
      };
    }

    return { txHash: result.transactionHash, error: null };
  } catch (error: any) {
    console.error("Error during burnUSDCOnNoble:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
    }
    throw new Error(error.message || "Failed to execute burnUSDCOnNoble");
  }
};
