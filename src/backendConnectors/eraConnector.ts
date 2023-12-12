import { ethers } from "ethers";

import { WalletState } from "@web3-onboard/core";
import { ERA__factory, ERAHomiNft__factory } from "./typechain-types";

interface NFTListingData {
    nftContractAddress: string;
    tokenId: string;
    paymentTokenAddress: string;
    amount: string;
    image: string;
    // start: string;
    // end: string;
    // mintBid: string;
    // max: string;
}

const eraContractAddr = "0xf9093B00805f9220f395D427c9afbC1E43CE3deb";
const hominftAddr = "0x175C3710cfBE66051A0A94baF231eDe867892806";


export async function listNFT(wallet: WalletState, formData: NFTListingData): Promise<boolean> {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const era = ERA__factory.connect(eraContractAddr, signer);
        const eraHomiNFT = ERAHomiNft__factory.connect(formData.nftContractAddress, signer);
        // const eraHomiNFT = ERAHomiNft__factory.connect(hominftAddr, signer);


        // const minNftTx = await eraHomiNFT.mintNewEraHomi("0x9f3B329f2130550B761277922BaE16C548eA771E", 2, true, { gasLimit: 100_000 });

        // await minNftTx.wait();
        const approvalTx = await eraHomiNFT.authorizeOperator(eraContractAddr, formData.tokenId, "0x", { gasLimit: 200000 });

        await new Promise((resolve) => setTimeout(resolve, 10000));

        // const approvalTxRec = await approvalTx.wait();
        // console.log("approval tx rec : ", approvalTxRec);

        const amountInEther = ethers.parseUnits(formData.amount.toString(), 'ether');

        const txn = await era.list(formData.nftContractAddress, formData.tokenId, formData.paymentTokenAddress, amountInEther.toString());
        // await txn.wait();
        // return true;
    } catch (error) {
        console.error('Error listing NFT:', error);
        return false;
    }
}
