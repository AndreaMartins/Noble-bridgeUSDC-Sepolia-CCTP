import React from 'react'

export interface KeplrDetailsProps {
  nobleAddress: string | null
  usdcBalance: string
  error: string | null
}

const KeplrDetails: React.FC<KeplrDetailsProps> = ({
  nobleAddress,
  usdcBalance,
  error
}) => {
  // Display address or a message if not connected
  const addressDisplay = nobleAddress || 'Address not connected'

  // Display balance or error message if available, otherwise show a default message
  const balanceDisplay = nobleAddress
    ? error
      ? error
      : `${usdcBalance} USDC`
    : 'Balance not available'

  return (
    <div className='border p-4 rounded-md mb-6'>
      <p className='font-mono text-sm break-all'>Address: {addressDisplay}</p>
      <p className='font-mono text-sm'>Balance: {balanceDisplay}</p>
    </div>
  )
}

export default KeplrDetails
