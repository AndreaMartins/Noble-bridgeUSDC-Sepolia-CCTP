import { useState, useEffect } from 'react'
import { StargateClient } from '@cosmjs/stargate'
import {
  NOBLE_RPC_URL,
  NOBLE_COIN_MINIMAL_DENOM
} from '../configs/noble-testnet-config'

export const useUSDCNobleBalance = (nobleAddress: string) => {
  const [usdcBalance, setUsdcBalance] = useState<string>('XX')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNobleBalance = async (address: string) => {
      try {
        const client = await StargateClient.connect(NOBLE_RPC_URL)

        // Fetch balance from the Noble testnet
        const balance = await client.getBalance(
          address,
          NOBLE_COIN_MINIMAL_DENOM
        )

        // Convert balance to USDC format and update state
        const amountInUSDC = (Number(balance.amount) / 1e6).toFixed(0)
        setUsdcBalance(amountInUSDC)
        setError(null)
      } catch (error) {
        // Handle errors and set an error message
        setError('Failed to fetch balance. Please try again later.')
      }
    }

    if (nobleAddress) {
      fetchNobleBalance(nobleAddress)
    }
  }, [nobleAddress])

  return { usdcBalance, error }
}
