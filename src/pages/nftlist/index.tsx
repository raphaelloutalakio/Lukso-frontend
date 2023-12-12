import Header from "components/layout/header";

import {
    StyleBody,
    PageBody,
    MainTab1,
    TabHeader,
    HeaderChild,
    TabBody,
    HeaderChildActive,
    TDStar,
    LabelTextDiv,
    LabelNam,
    TabInput,
    SaveBtn,
    MainDiv,
    MainRow,
    MainContainer,
    ImageDiv,
    MainRowDate,
    ImageDivCol,
    CustomFile
} from './index.styled';

import { useEffect, useState } from "react";
import Img from '/images/avatars/empty.png';
import { uploadJson, uploadToIpfs } from "backendConnectors/utils/IpfsHelpers";
import { listNFT } from "backendConnectors/eraConnector";
import { ethers } from "ethers";
import { WalletState } from "@web3-onboard/core";
import { useConnectWallet } from "@web3-onboard/react";


const NFTList = () => {
    const [{ wallet }] = useConnectWallet()
    const [tab, setTab] = useState(true);
    const [listFormData, setListFormData] = useState({
        imageFile: Img,
        nftContractAddress: "",
        tokenId: "",
        paymentTokenAddress: "",
        amount: ""
    });

    const [auctionFormData, setAuctionFormData] = useState({
        imageFile: Img,
        nftContractAddress: "",
        tokenId: "",
        paymentTokenAddress: "",
        amount: "",
        start: "",
        end: "",
        mintBid: "",
        max: ""
    });

    const handleImageUpload = (e, formType) => {
        const imageFilefromUpload = e.target.files[0];

        // const imgCID = await uploadToIpfs(imageFile)

        // const json: NFTJson = {
        //     // description: data.itemDescription,
        //     // name: data.itemName,
        //     image: `ipfs://${imgCID}`,
        // }

        // console.log(JSON.stringify(json))
        // const tokenURI = await uploadJson(json)
        // console.log("token URI : ", tokenURI)
        // return tokenURI

        if (formType === 'list') {
            setListFormData({ ...listFormData, imageFile: imageFilefromUpload });
        } else {
            setAuctionFormData({ ...auctionFormData, imageFile: imageFilefromUpload });
        }
    }

    // const fetchUri = async (param) => {
    //     const imgCID = await uploadToIpfs(param);

    //     const json: NFTJson = {
    //         // description: data.itemDescription,
    //         // name: data.itemName,
    //         image: `ipfs://${imgCID}`,
    //     }

    //     console.log(JSON.stringify(json))
    //     const tokenURI = await uploadJson(json)
    //     console.log("token URI : ", tokenURI)
    //     return tokenURI

    // }

    const handleListFormSubmit = async () => {
        console.log('List NFT Form Data:', listFormData);



        await listNFT(wallet!, listFormData);



    }

    const handleAuctionFormSubmit = () => {
        console.log('Auction NFT Form Data:', auctionFormData);
        // Add your logic to handle the form submission, e.g., send data to the server
    }



    return (
        <StyleBody>
            <Header />
            <PageBody>
                <MainTab1 $bg={tab ? 'left' : 'right'}>
                    <TabHeader>
                        <HeaderChildActive onClick={() => setTab(true)}>
                            List NFT
                        </HeaderChildActive>
                        <HeaderChild onClick={() => setTab(false)}>
                            Auction NFT
                        </HeaderChild>
                    </TabHeader>
                    {
                        tab ? (
                            <TabBody>
                                <TDStar src='/images/icons/star.svg' />
                                <MainDiv>
                                    {/* <ImageDivCol>
                                        <CustomFile>
                                            Image Upload
                                            <input
                                                type="file"
                                                onChange={(e) => handleImageUpload(e, 'list')}
                                            />
                                        </CustomFile>
                                        <img src={listFormData.image} width={100} alt="" style={{ width: '100%' }} />
                                    </ImageDivCol> */}
                                    <MainContainer>
                                        <MainRow style={{ display: 'flex', gap: '40px', width: '100%' }}>
                                            <LabelTextDiv>
                                                <LabelNam htmlFor="">NFT Contract Address</LabelNam>
                                                <TabInput
                                                    type="text"
                                                    placeholder="Enter the NFT contract address"
                                                    onChange={(e) => setListFormData({ ...listFormData, nftContractAddress: e.target.value })}
                                                />
                                            </LabelTextDiv>
                                            <LabelTextDiv>
                                                <LabelNam htmlFor="">Token ID</LabelNam>
                                                <TabInput
                                                    type="text"
                                                    placeholder="Enter the token ID"
                                                    onChange={(e) => setListFormData({ ...listFormData, tokenId: e.target.value })}
                                                />
                                            </LabelTextDiv>
                                        </MainRow>
                                        <MainRow style={{ display: 'flex', gap: '40px', width: '100%' }}>
                                            <LabelTextDiv>
                                                <LabelNam htmlFor="">Payment Token Address</LabelNam>
                                                <TabInput
                                                    type="text"
                                                    placeholder="Enter the payment token address"
                                                    onChange={(e) => setListFormData({ ...listFormData, paymentTokenAddress: e.target.value })}
                                                />
                                            </LabelTextDiv>
                                            <LabelTextDiv>
                                                <LabelNam htmlFor="">Amount</LabelNam>
                                                <TabInput
                                                    type="text"
                                                    placeholder="Enter the amount"
                                                    onChange={(e) => setListFormData({ ...listFormData, amount: e.target.value })}
                                                />
                                            </LabelTextDiv>
                                        </MainRow>
                                        <SaveBtn onClick={handleListFormSubmit}>
                                            Submit
                                        </SaveBtn>
                                    </MainContainer>
                                </MainDiv>
                            </TabBody>
                        ) : (
                            <TabBody>
                                <TDStar src='/images/icons/star.svg' />
                                <MainDiv>
                                    {/* <ImageDivCol>
                                        <CustomFile>
                                            Image Upload
                                            <input
                                                type="file"
                                                onChange={(e) => handleImageUpload(e, 'auction')}
                                            />
                                        </CustomFile>
                                        <img src={auctionFormData.image} width={100} alt="" style={{ width: '100%' }} />
                                    </ImageDivCol> */}
                                    <MainContainer>
                                        <MainRow>
                                            <LabelTextDiv>
                                                <LabelNam htmlFor="">NFT Contract Address</LabelNam>
                                                <TabInput
                                                    type="text"
                                                    placeholder="Enter the NFT contract address"
                                                    onChange={(e) => setAuctionFormData({ ...auctionFormData, nftContractAddress: e.target.value })}
                                                />
                                            </LabelTextDiv>
                                            <LabelTextDiv>
                                                <LabelNam htmlFor="">Token ID</LabelNam>
                                                <TabInput
                                                    type="text"
                                                    placeholder="Enter the token ID"
                                                    onChange={(e) => setAuctionFormData({ ...auctionFormData, tokenId: e.target.value })}
                                                />
                                            </LabelTextDiv>
                                        </MainRow>
                                        <MainRow>
                                            <LabelTextDiv>
                                                <LabelNam htmlFor="">Payment Token Address</LabelNam>
                                                <TabInput
                                                    type="text"
                                                    placeholder="Enter the payment token address"
                                                    onChange={(e) => setAuctionFormData({ ...auctionFormData, paymentTokenAddress: e.target.value })}
                                                />
                                            </LabelTextDiv>
                                            <LabelTextDiv>
                                                <LabelNam htmlFor="">Amount</LabelNam>
                                                <TabInput
                                                    type="text"
                                                    placeholder="Enter the amount"
                                                    onChange={(e) => setAuctionFormData({ ...auctionFormData, amount: e.target.value })}
                                                />
                                            </LabelTextDiv>
                                        </MainRow>
                                        <MainRow>
                                            <MainRowDate>
                                                <LabelTextDiv>
                                                    <LabelNam htmlFor="">Start</LabelNam>
                                                    <TabInput
                                                        type="date"
                                                        placeholder="dd/mm/yyyy"
                                                        onChange={(e) => setAuctionFormData({ ...auctionFormData, start: e.target.value })}
                                                    />
                                                </LabelTextDiv>
                                                <LabelTextDiv>
                                                    <LabelNam htmlFor="">End</LabelNam>
                                                    <TabInput
                                                        type="date"
                                                        placeholder="dd/mm/yyyy"
                                                        onChange={(e) => setAuctionFormData({ ...auctionFormData, end: e.target.value })}
                                                    />
                                                </LabelTextDiv>
                                            </MainRowDate>
                                            <MainRowDate>
                                                <LabelTextDiv>
                                                    <LabelNam htmlFor="">Mint Bid</LabelNam>
                                                    <TabInput
                                                        type="number"
                                                        placeholder="0.1"
                                                        onChange={(e) => setAuctionFormData({ ...auctionFormData, mintBid: e.target.value })}
                                                    />
                                                </LabelTextDiv>
                                                <LabelTextDiv>
                                                    <LabelNam htmlFor="">Max</LabelNam>
                                                    <TabInput
                                                        type="number"
                                                        placeholder="0.1"
                                                        onChange={(e) => setAuctionFormData({ ...auctionFormData, max: e.target.value })}
                                                    />
                                                </LabelTextDiv>
                                            </MainRowDate>
                                        </MainRow>
                                        <SaveBtn onClick={handleAuctionFormSubmit}>
                                            Submit
                                        </SaveBtn>
                                    </MainContainer>
                                </MainDiv>
                            </TabBody>
                        )
                    }
                </MainTab1>
            </PageBody>
        </StyleBody>
    )
}

export default NFTList;
