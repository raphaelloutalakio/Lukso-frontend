import { ethers } from "ethers";

import { WalletState } from "@web3-onboard/core";
import { ERA__factory } from "./typechain-types";

interface NFTListingData {
    nftContractAddress: string;
    tokenId: string;
    paymentTokenAddress: string;
    amount: string;
    image: string;
    start: string;
    end: string;
    mintBid: string;
    max: string;
}

const eraContractAddr = "0xxxx";

export async function listNFT(wallet: WalletState, formData: NFTListingData): Promise<boolean> {
    try {
        const provider = new ethers.BrowserProvider(wallet.provider, 'any');
        const signer = await provider.getSigner();

        const token = ERA__factory.connect(eraContractAddr, signer);

        const txn = await token.list(formData.nftContractAddress, formData.tokenId, formData.paymentTokenAddress, formData.amount);

        // Log the transaction details
        console.log(txn);

        // Check if the transaction is successful
        // if (txn.status === 1) {
        //     // Transaction successful
        //     return true;
        // } else {
        //     // Transaction failed
        //     console.error('Transaction failed:', txn);
        //     return false;
        // }
    } catch (error) {
        // Handle errors here
        console.error('Error listing NFT:', error);

        // Check if the error is due to a failed transaction
        // if (error?.code === 'TRANSACTION_FAILED') {
        //     console.error('Transaction failed:', error);
        //     return false;
        // }

        throw error; // Rethrow the error for the caller to handle other types of errors
    }
}