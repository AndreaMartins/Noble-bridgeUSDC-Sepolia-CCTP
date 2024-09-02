import { useState } from 'react'
import { burnUSDCOnNoble } from '../scripts/depositForBurn'

export const useUSDCTransfer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [transactionLink, setTransactionLink] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const transferUSDC = async (
    nobleAddress: string,
    mintAmount: string,
    ethRecipientAddress: string
  ) => {
    const mintAmountNumber = parseFloat(mintAmount)

    // Validate the mint amount
    if (isNaN(mintAmountNumber) || mintAmountNumber <= 0) {
      setError('Invalid amount specified for minting.')
      setIsOpen(true)
      return
    }

    try {
      const { txHash, error } = await burnUSDCOnNoble(
        nobleAddress,
        mintAmountNumber,
        ethRecipientAddress
      )

      if (error) {
        setTransactionLink(
          txHash ? `https://mintscan.io/noble-testnet/tx/${txHash}` : ''
        )
        throw new Error(error)
      }

      // Set the transaction link if successful
      setTransactionLink(`https://mintscan.io/noble-testnet/tx/${txHash}`)
      setError(null)
    } catch (error: any) {
      // Handle errors and set an appropriate message
      setError(error.message || 'An error occurred during the transaction.')
    } finally {
      setIsOpen(true) // Open modal or show error message
    }
  }

  return { transferUSDC, isOpen, setIsOpen, transactionLink, error }
}
