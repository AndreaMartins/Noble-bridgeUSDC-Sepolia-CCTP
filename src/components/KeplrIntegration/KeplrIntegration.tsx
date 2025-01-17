import { useState } from 'react'
import { NOBLE_CHAIN_ID } from '../../configs/noble-testnet-config'
import KeplrDetails from './KeplrDetails'
import { useUSDCNobleBalance } from '../../hooks/useUSDCNobleBalance'

interface KeplrIntegrationProps {
  onAddressChange: (address: string) => void
  onConnectionChange: (isConnected: boolean) => void
}

function KeplrIntegration ({
  onAddressChange,
  onConnectionChange
}: KeplrIntegrationProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [nobleAddress, setNobleAddress] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Fetch USDC balance for the current nobleAddress
  const { usdcBalance, error: balanceError } = useUSDCNobleBalance(
    nobleAddress || ''
  )

  // Connect to Keplr wallet
  const connectKeplr = async () => {
    if (!window.keplr) {
      alert('Please install the Keplr extension')
      return
    }

    try {
      await window.keplr.enable(NOBLE_CHAIN_ID)
      const offlineSigner = window.getOfflineSigner(NOBLE_CHAIN_ID)
      const [account] = await offlineSigner.getAccounts()
      setNobleAddress(account.address)
      onAddressChange(account.address)
      setIsConnected(true)
      onConnectionChange(true)
    } catch (error) {
      console.error('Failed to connect to Keplr:', error)
      setError('Failed to connect to Keplr.')
      onConnectionChange(false)
    }
  }

  // Disconnect from Keplr wallet
  const disconnectKeplr = () => {
    setNobleAddress(null)
    onAddressChange('')
    setIsConnected(false)
    onConnectionChange(false)
  }

  // Button styles based on connection state
  const buttonStyles = isConnected
    ? 'bg-[#deb841] hover:bg-[#d0a431]'
    : 'bg-[#deb841] hover:bg-[#d0a431]'

  return (
    <div className='mb-4 max-w-lg mx-auto'>
      <button
        onClick={isConnected ? disconnectKeplr : connectKeplr}
        className={`w-full py-2 px-4 rounded text-white ${buttonStyles} transition-colors duration-150 ease-in-out`}
      >
        {isConnected ? 'Disconnect Keplr' : 'Connect Keplr'}
      </button>
      {isConnected && nobleAddress && (
        <KeplrDetails
          nobleAddress={nobleAddress}
          usdcBalance={usdcBalance || 'Loading...'}
          error={error || balanceError || ''}
        />
      )}
    </div>
  )
}

export default KeplrIntegration
