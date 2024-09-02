# Noble-to-Sepolia Token Transfer Web3 Application

# Noble-to-Sepolia Token Transfer Web3 Application

## Overview

This Web3 application enables seamless token transfers between the Noble testnet and the Sepolia network using the Cross-Chain Transfer Protocol (CCTP). It integrates MetaMask and Keplr wallets to provide a smooth and secure user experience across Ethereum and Cosmos-based blockchains.

## Features

- **Cross-Chain Token Transfers**: Effortlessly transfer tokens from the Noble testnet to the Sepolia network via CCTP.
- **Multi-Wallet Support**: Compatibility with MetaMask and Keplr wallets for interaction with both Ethereum and Cosmos-based blockchains.
- **Secure and Efficient**: Designed with a focus on security and efficiency to ensure a seamless user experience.

## Project Structure

├── generated/ ├── node_modules/ ├── public/ ├── src/ │ ├── components/ │ │ ├── KeplrIntegration/ │ │ │ ├── KeplrDetails.tsx │ │ │ ├── KeplrIntegration.tsx │ │ ├── MetaMaskIntegration/ │ │ │ ├── MetaMaskIntegration.tsx │ │ ├── TransferForm/ │ │ │ ├── TransferForm.tsx │ │ ├── TransferModal/ │ │ ├── TransferModal.tsx │ ├── configs/ │ │ ├── noble-testnet-config.ts │ ├── hooks/ │ │ ├── useUSDCNobleBalance.ts │ │ ├── useUSDCTransfer.ts │ ├── scripts/ │ │ ├── depositForBurn.ts │ │ ├── receiveMessage.ts │ ├── App.tsx │ ├── index.css │ ├── main.tsx │ ├── vite-env.d.ts


├── generated/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── KeplrIntegration/
│   │   │   ├── KeplrDetails.tsx
│   │   │   ├── KeplrIntegration.tsx
│   │   ├── MetaMaskIntegration/
│   │   │   ├── MetaMaskIntegration.tsx
│   │   ├── TransferForm/
│   │   │   ├── TransferForm.tsx
│   │   ├── TransferModal/
│   │       ├── TransferModal.tsx
│   ├── configs/
│   │   ├── noble-testnet-config.ts
│   ├── hooks/
│   │   ├── useUSDCNobleBalance.ts
│   │   ├── useUSDCTransfer.ts
│   ├── scripts/
│   │   ├── depositForBurn.ts
│   │   ├── receiveMessage.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── vite-env.d.ts

Detailed Description
components/
KeplrIntegration/: Contains components related to the integration of the Keplr wallet, specifically for handling interactions on Cosmos-based blockchains.
KeplrDetails.tsx: Displays detailed information related to the Keplr wallet.
KeplrIntegration.tsx: Manages the integration logic for the Keplr wallet.
MetaMaskIntegration/: Contains the integration logic for MetaMask, allowing users to interact with Ethereum-based networks.
MetaMaskIntegration.tsx: Handles MetaMask wallet integration.
TransferForm/: A form component that allows users to input details for transferring tokens from the Noble testnet to Sepolia.
TransferForm.tsx: The main form component for initiating a token transfer.
TransferModal/: Displays a modal during the token transfer process, providing feedback to the user.
TransferModal.tsx: The modal component for transfer operations.
configs/
noble-testnet-config.ts: Configuration file for connecting to the Noble testnet.
hooks/
useUSDCNobleBalance.ts: A custom hook to fetch and manage the user's USDC balance on the Noble testnet.
useUSDCTransfer.ts: A custom hook to manage the transfer of USDC tokens between the Noble testnet and Sepolia network.
scripts/
depositForBurn.ts: Script to handle the deposit and burning process on the Noble testnet before initiating a transfer.
receiveMessage.ts: Script to receive and handle messages related to the token transfer.
App.tsx: The main application component.
index.css: Global CSS styles for the application.
main.tsx: The entry point for the React application.
vite-env.d.ts: TypeScript declaration file for Vite.
Getting Started

Prerequisites
Node.js (v16+)
npm or yarn
MetaMask and Keplr wallet extensions installed in your browser.

Usage
Connect Your Wallet:
Use MetaMask for Ethereum-based interactions (Sepolia network).
Use Keplr for Cosmos-based interactions (Noble testnet).
Transfer Tokens:
Fill out the form in the TransferForm component to initiate a token transfer from Noble testnet to Sepolia.
Monitor Transfer Progress:
The TransferModal will provide feedback and updates on the status of your transfer.
