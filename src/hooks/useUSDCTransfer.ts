import { useState } from 'react';
import { burnUSDCOnNoble } from '../scripts/depositForBurn';

export const useUSDCTransfer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [transactionLink, setTransactionLink] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const transferUSDC = async (
    nobleAddress: string, 
    mintAmount: string, 
    ethRecipientAddress: string
  ) => {
    // console.log('Mint amount input:', mintAmount); 
    const mintAmountNumber = parseFloat(mintAmount);

    if (isNaN(mintAmountNumber) || mintAmountNumber <= 0) {
      // console.error(`Invalid mint amount: ${mintAmount}`);
      setError('Invalid amount specified for minting.');
      setIsOpen(true); 
      return;
    }

    try {
      const { txHash, error } = await burnUSDCOnNoble(
        nobleAddress, 
        mintAmountNumber,
        ethRecipientAddress
      );

      if (error) {
        setTransactionLink(txHash ? `https://mintscan.io/noble-testnet/tx/${txHash}` : '');
        throw new Error(error);
      }

      setTransactionLink(`https://mintscan.io/noble-testnet/tx/${txHash}`);
      setError(null); 
      // console.log('Transaction completed successfully:', txHash);
    } catch (error: any) {
      // console.error('Error during USDC bridging:', error);
      setError(error.message || 'An error occurred during the transaction.');
    } finally {
      setIsOpen(true); 
    }
  };

  return { transferUSDC, isOpen, setIsOpen, transactionLink, error };
};
