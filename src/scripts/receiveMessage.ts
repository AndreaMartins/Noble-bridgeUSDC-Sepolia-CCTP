import {
  DirectSecp256k1HdWallet,
  Registry,
  GeneratedType
} from '@cosmjs/proto-signing'
import { SigningStargateClient } from '@cosmjs/stargate'
import { MsgReceiveMessage } from '../../generated/tx'
import { ethers } from 'ethers'
import { arrayify, hexlify } from '@ethersproject/bytes'
import { Buffer } from 'buffer'
import { NOBLE_RPC_URL } from '../configs/noble-testnet-config'

// Define the types for Circle's CCTP messages to handle message receipts
export const cctpTypes: ReadonlyArray<[string, GeneratedType]> = [
  ['/circle.cctp.v1.MsgReceiveMessage', MsgReceiveMessage]
]

// Create a registry with CCTP message types for handling transactions
function createDefaultRegistry (): Registry {
  return new Registry(cctpTypes)
}

const apiKey = import.meta.env.VITE_CIRCLE_API_KEY

// Function to fetch the message and attestation from CCTP using a transaction hash
export const getMessageFromCCTP = async (txHash: string) => {
  const response = await fetch(
    `https://api.circle.com/v1/cross-chain/attestations/${txHash}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`, // Use the Circle API key from environment variables
        'Content-Type': 'application/json'
      }
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch message from CCTP')
  }

  const data = await response.json()
  return {
    messageHex: data.message,
    attestation: data.attestation
  }
}

// Function to receive and process a CCTP message on the Noble blockchain
export const receiveMessageFromCCTP = async (txHash: string) => {
  const mnemonic = import.meta.env.VITE_MNEMONIC || ''
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: 'noble'
  })

  const [account] = await wallet.getAccounts()
  const client = await SigningStargateClient.connectWithSigner(
    NOBLE_RPC_URL,
    wallet,
    { registry: createDefaultRegistry() }
  )

  const { messageHex, attestation } = await getMessageFromCCTP(txHash)
  const messageBytes = new Uint8Array(
    Buffer.from(messageHex.replace('0x', ''), 'hex')
  )
  const attestationBytes = new Uint8Array(
    Buffer.from(attestation.replace('0x', ''), 'hex')
  )

  const msg = {
    typeUrl: '/circle.cctp.v1.MsgReceiveMessage',
    value: {
      from: account.address,
      message: messageBytes,
      attestation: attestationBytes
    }
  }

  const fee = {
    amount: [{ denom: 'uusdc', amount: '0' }], // Set fee to 0 uusdc
    gas: '300000' // Set the gas limit
  }
  const memo = ''

  const result = await client.signAndBroadcast(
    account.address,
    [msg],
    fee,
    memo
  )

  return { messageHex, attestation }
}

// Function to send the message and attestation to the Sepolia network
export const sendMessageToSepolia = async ({
  messageHex,
  attestation,
  contractAddress
}: {
  messageHex: string
  attestation: string
  contractAddress: string
}) => {
  const provider = new ethers.BrowserProvider(
    window.ethereum as unknown as ethers.Eip1193Provider
  )
  const signer = await provider.getSigner()

  const messageBytes = arrayify(messageHex)
  const attestationBytes = arrayify(attestation)

  const tx = await signer.sendTransaction({
    to: contractAddress,
    data: hexlify([...messageBytes, ...attestationBytes])
  })

  if (tx.hash) {
    alert(
      `Transaction sent to Sepolia successfully. Transaction Hash: ${tx.hash}`
    )
  } else {
    alert('Failed to retrieve transaction receipt.')
  }

  return tx
}
