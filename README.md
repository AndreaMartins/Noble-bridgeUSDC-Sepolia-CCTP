# Noble-to-Sepolia Token Transfer Web3 Application

## Overview

This Web3 application enables seamless token transfers between the Noble testnet and the Sepolia network using the Cross-Chain Transfer Protocol (CCTP). It integrates MetaMask and Keplr wallets to provide a smooth and secure user experience across Ethereum and Cosmos-based blockchains.

## Features

- **Cross-Chain Token Transfers**: Effortlessly transfer tokens from the Noble testnet to the Sepolia network via CCTP.
- **Multi-Wallet Support**: Compatibility with MetaMask and Keplr wallets for interaction with both Ethereum and Cosmos-based blockchains.
- **Secure and Efficient**: Designed with a focus on security and efficiency to ensure a seamless user experience.

## Project Structure

```plaintext
├── generated/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── KeplrIntegration/
│   │   │   ├── KeplrDetails.tsx
│   │   │   └── KeplrIntegration.tsx
│   │   ├── MetaMaskIntegration/
│   │   │   └── MetaMaskIntegration.tsx
│   │   ├── TransferForm/
│   │   │   └── TransferForm.tsx
│   │   └── TransferModal/
│   │       └── TransferModal.tsx
│   ├── configs/
│   │   └── noble-testnet-config.ts
│   ├── hooks/
│   │   ├── useUSDCNobleBalance.ts
│   │   └── useUSDCTransfer.ts
│   ├── scripts/
│   │   ├── depositForBurn.ts
│   │   └── receiveMessage.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
```

## Detailed Description

- **components/**
  - **KeplrIntegration/**: Components for integrating the Keplr wallet for Cosmos-based blockchains.
    - `KeplrDetails.tsx`: Displays balace of USDC and address of the Keplr wallet.
    - `KeplrIntegration.tsx`: Handles the integration logic for the Keplr wallet.
  - **MetaMaskIntegration/**: Components for integrating MetaMask for Ethereum-based networks.
    - `MetaMaskIntegration.tsx`: Manages MetaMask wallet integration.
  - **TransferForm/**: 
    - `TransferForm.tsx`: Form component for initiating token transfers from the Noble testnet to Sepolia.
  - **TransferModal/**: 
    - `TransferModal.tsx`: Modal component providing feedback during the token transfer process.

- **configs/**
  - `noble-testnet-config.ts`: Configuration for connecting to the Noble testnet.

- **hooks/**
  - `useUSDCNobleBalance.ts`: Custom hook to fetch and manage the USDC balance on the Noble testnet.
  - `useUSDCTransfer.ts`: Custom hook to manage USDC token transfers between Noble and Sepolia.

- **scripts/**
  - `depositForBurn.ts`: Handles deposit and burning on the Noble testnet before initiating a transfer.
  - `receiveMessage.ts`: Receives and processes messages related to token transfers.

- **App.tsx**: The main application component.
- **index.css**: Global CSS styles for the application.
- **main.tsx**: Entry point for the React application.
- **vite-env.d.ts**: TypeScript declaration file for Vite.

## Getting Started

### Prerequisites

- Node.js (v20+)
- npm 
- MetaMask and Keplr wallet extensions installed in your browser

### Usage

1. **Connect Your Wallet**:
   - Use MetaMask for interactions on the Ethereum-based Sepolia network.
   - Use Keplr for interactions on the Cosmos-based Noble testnet.

2. **Transfer Tokens**:
   - Complete the form in the `TransferForm` component to initiate a token transfer from the Noble testnet to Sepolia.

3. **Monitor Transfer Progress**:
   - The `TransferModal` will display feedback and updates on the status of your transfer.

Enjoy seamless cross-chain token transfers!
