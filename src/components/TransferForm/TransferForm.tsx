import React from "react";

export interface TransferFormProps {
  mintAmount: string;
  ethRecipientAddress: string;
  setMintAmount: (value: string) => void;
  setEthRecipientAddress: (value: string) => void;
  onSubmit: () => void;
  error?: string;
}

const TransferForm: React.FC<TransferFormProps> = ({
  mintAmount,
  ethRecipientAddress,
  setMintAmount,
  setEthRecipientAddress,
  onSubmit,
}) => {
  return (
    <div className="border p-6 rounded-md mb-6 bg-[#6d6a75] text-[#bfbdc1] shadow-md">
      <h2 className="text-lg mb-4 text-center text-[#deb841]">
        Transfer USDC from Noble
      </h2>
      <input
        type="number"
        placeholder="Mint amount"
        className="w-full p-3 border border-[#deb841] rounded mb-4 bg-[#bfbdc1] text-[#6d6a75] placeholder-[#6d6a75] focus:outline-none focus:ring-2 focus:ring-[#deb841] focus:border-transparent"
        value={mintAmount}
        onChange={(e) => setMintAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="ETH recipient address"
        className="w-full p-3 border border-[#deb841] rounded mb-4 bg-[#bfbdc1] text-[#6d6a75] placeholder-[#6d6a75] focus:outline-none focus:ring-2 focus:ring-[#deb841] focus:border-transparent"
        value={ethRecipientAddress}
        onChange={(e) => setEthRecipientAddress(e.target.value)}
      />
      <button
        onClick={onSubmit}
        className="w-full py-2 rounded text-white bg-[#deb841] hover:bg-[#d0a431] transition-colors duration-150 ease-in-out"
      >
        Bridge
      </button>
    </div>
  );  
};

export default TransferForm;