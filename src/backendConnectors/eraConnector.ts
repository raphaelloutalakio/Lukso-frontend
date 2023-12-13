import { ethers } from "ethers";

import { WalletState } from "@web3-onboard/core";
import { ERA__factory, ERAHomiNft__factory, MyToken__factory } from "./typechain-types";

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

interface AUCTIONData {
    nftContractAddress: string;
    tokenId: string;
    paymentTokenAddress: string;
    minAmount: string;
    image: string;
    start: string;
    end: string;
    minBidIncreament: string;
    maxBidIncreament: string;
}

const eraContractAddr = "0x8455ec7621CE3Ff3614718432f890453ea70F79e";
const hominftAddr = "0x175C3710cfBE66051A0A94baF231eDe867892806";


const convertAmountToEther = (amount: string) => {
    return (ethers.parseUnits(amount.toString(), 'ether')).toString();
};


export async function listNFT(wallet: WalletState, formData: NFTListingData, setLoading): Promise<boolean> {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const era = ERA__factory.connect(eraContractAddr, signer);
        const eraHomiNFT = ERAHomiNft__factory.connect(formData.nftContractAddress, signer);
        // const eraHomiNFT = ERAHomiNft__factory.connect(hominftAddr, signer);


        // const minNftTx = await eraHomiNFT.mintNewEraHomi("0x9f3B329f2130550B761277922BaE16C548eA771E", 2, true, { gasLimit: 100_000 });

        // await minNftTx.wait();
        setLoading(true);
        const approvalTx = await eraHomiNFT.authorizeOperator(eraContractAddr, formData.tokenId, "0x", { gasLimit: 200000 });
        setLoading(false);

        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setLoading(false);

        // const approvalTxRec = await approvalTx.wait();
        // console.log("approval tx rec : ", approvalTxRec);

        const amountInEther = ethers.parseUnits(formData.amount.toString(), 'ether');
        setLoading(true);
        const txn = await era.list(formData.nftContractAddress, formData.tokenId, formData.paymentTokenAddress, amountInEther.toString());
        setLoading(false);
        // await txn.wait();
        // return true;
    } catch (error) {
        setLoading(false);
        console.error('Error listing NFT:', error);
        return false;
    }
}

export async function auctionNFT(wallet: WalletState, formData: AUCTIONData, setLoading): Promise<boolean> {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const era = ERA__factory.connect(eraContractAddr, signer);
        const eraHomiNFT = ERAHomiNft__factory.connect(formData.nftContractAddress, signer);


        /// data
        const startTime = Math.floor(new Date(formData?.start).getTime() / 1000);
        const expirationTime = Math.floor(new Date(formData?.end).getTime() / 1000);
        const min = convertAmountToEther(formData.minBidIncreament);
        const amount = convertAmountToEther(formData.minAmount);


        setLoading(true);
        await eraHomiNFT.authorizeOperator(eraContractAddr, formData.tokenId, "0x", { gasLimit: 200000 });
        setLoading(false);

        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setLoading(false);

        setLoading(true);
        await era.listAuction(
            formData.nftContractAddress,
            formData.tokenId,
            formData.paymentTokenAddress,
            min, amount, startTime, expirationTime,
            { gasLimit: 200000 }
        ); setLoading(false);
        return true;
    } catch (error) {
        setLoading(false);
        console.error('Error listing NFT:', error);
        return false;
    }
}


function bytesToString(bytes) {
    return ethers.toUtf8String(bytes);
}

export const getNftLists = async (): Promise<any> => {
    try {
        const provider = new ethers.JsonRpcProvider('https://rpc.testnet.lukso.network');

        let getAllLists: any[] = [];
        const contract = ERA__factory.connect(eraContractAddr, provider);

        const tx = await contract.marketplace();

        if (Number(tx[3])) {
            let list_length = Number(tx[3]);
            for (let i = 0; i < list_length; i++) {
                let a = await contract.lists(i);
                // Convert non-boolean items to string
                const stringifiedItem = a.map((item: any) => (typeof item !== 'boolean' ? item.toString() : item));
                const tokenAddress = stringifiedItem[4];

                const tokenContract = MyToken__factory.connect(tokenAddress, provider);

                let tokenSymbol = await tokenContract.getData("0x2f0a68ab07768e01943a599e73362a0e17a63a72e94dd2e384d2c1d4db932756")
                tokenSymbol = bytesToString(tokenSymbol);

                console.log("symbl  ", tokenSymbol);

                stringifiedItem.push(tokenSymbol); // Add token symbol to the array
                getAllLists = [...getAllLists, stringifiedItem];
            }
        }

        console.log('getAllLists : ', { getAllLists });

        return {
            success: true,
            listings: getAllLists,
        };
    } catch (error) {
        setLoading(false);
        return {
            success: false,
            msg: error.message,
        };
    }
};

export async function buyListedNft(id: string, amount: string, paymentTokenAddr: string, setLoading): Promise<boolean> {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        console.log("singer: ", signer);

        const era = ERA__factory.connect(eraContractAddr, signer);
        const tokenContract = MyToken__factory.connect(paymentTokenAddr, signer);

        console.log("token : ", tokenContract);
        setLoading(true);
        await tokenContract.authorizeOperator(eraContractAddr,
            "8888888000000000000000000",
            "0x",
            { gasLimit: 200000 }
        );
        setLoading(false);

        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setLoading(false);

        setLoading(true);
        await era.buy(
            id,
            { gasLimit: 200000 }
        );
        setLoading(false);
        return true;
    } catch (error) {
        setLoading(false);
        console.error('Error buying nft:', error);
        return false;
    }
}


