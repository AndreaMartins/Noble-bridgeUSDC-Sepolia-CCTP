import React, { useState } from 'react'
import MetaMaskIntegration from './components/MetaMaskIntegration/MetaMaskIntegration'
import KeplrIntegration from './components/KeplrIntegration/KeplrIntegration'
import TransferModal from './components/TransferModal/TransferModal'
import { useUSDCTransfer } from './hooks/useUSDCTransfer'
import TransferForm from './components/TransferForm/TransferForm'

const App: React.FC = () => {
  const [mintAmount, setMintAmount] = useState<string>('')
  const [ethRecipientAddress, setEthRecipientAddress] = useState<string>('')
  const [nobleAddress, setNobleAddress] = useState<string | null>(null)
  const [isKeplrConnected, setIsKeplrConnected] = useState<boolean>(false) // State for Keplr connection

  const { transferUSDC, isOpen, setIsOpen, transactionLink, error } =
    useUSDCTransfer()

  // Handler for bridging USDC
  const handleBridgeUSDC = async () => {
    if (nobleAddress) {
      await transferUSDC(nobleAddress, mintAmount, ethRecipientAddress)
    } else {
      console.error('Noble address is missing.')
    }
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-[#bfbdc1] p-6'>
      <div className='w-full max-w-lg p-8 bg-[#6d6a75] text-[#bfbdc1] shadow-lg rounded-lg border border-[#deb841]'>
        <h1 className='text-3xl font-bold text-center text-[#deb841] mb-8'>
          USDC Bridge: Noble to Ethereum via CCTP
        </h1>
        <div className='mb-6'>
          <KeplrIntegration
            onAddressChange={setNobleAddress}
            onConnectionChange={setIsKeplrConnected} // Pass connection status handler
          />
        </div>

        {isKeplrConnected && (
          <div className='mb-8'>
            <TransferForm
              mintAmount={mintAmount}
              ethRecipientAddress={ethRecipientAddress}
              setMintAmount={setMintAmount}
              setEthRecipientAddress={setEthRecipientAddress}
              onSubmit={handleBridgeUSDC}
            />
          </div>
        )}

        <h2 className='text-lg text-center text-[#deb841] mb-4'>
          Bridged to MetaMask? Check your balance!
        </h2>

        <div className='mb-6'>
          <MetaMaskIntegration />
        </div>
      </div>

      <TransferModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        transactionLink={transactionLink}
        error={error}
      />
    </div>
  )
}

export default App
