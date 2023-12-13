import Header from "components/layout/header";
import ReactLoading from 'react-loading';

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
import { listNFT, auctionNFT } from "backendConnectors/eraConnector";
import { ethers } from "ethers";
import { WalletState } from "@web3-onboard/core";
import { useConnectWallet } from "@web3-onboard/react";



const NFTList = () => {
    const [{ wallet }] = useConnectWallet()
    const [tab, setTab] = useState(0);
    const [bgName, setBgName] = useState('Subtract.png')
    const [listFormData, setListFormData] = useState({
        imageFile: Img,
        nftContractAddress: "",
        tokenId: "",
        paymentTokenAddress: "",
        amount: ""
    });

    const [isLoading, setLoading] = useState(false);

    const [auctionFormData, setAuctionFormData] = useState({
        imageFile: Img,
        nftContractAddress: "",
        tokenId: "",
        paymentTokenAddress: "",
        minAmount: "",
        start: "",
        end: "",
        minBidIncreament: "",
        maxBidIncreament: ""
    });

    const [mintInfo, setMintInfo] = useState({
        imageFile: Img,
        fileType: File,
        description: "",
        name: "",
        tokenId: "",

    });

    const handleImageUpload = async (e, formType) => {
        const imageFilefromUpload = e.target.files[0];

        console.log("file : ", imageFilefromUpload);

        setMintInfo({ ...mintInfo, fileType: imageFilefromUpload, imageFile: URL.createObjectURL(e.target.files[0]) });

        // const imgCID = await uploadToIpfs(imageFilefromUpload)

        // const json: NFTJson = {
        //     description: data.itemDescription,
        //     name: data.itemName,
        //     image: `ipfs://${imgCID}`,
        // }

        // console.log(JSON.stringify(json))
        // const tokenURI = await uploadJson(json)
        // console.log("token URI : ", tokenURI)
        // return tokenURI

        // if (formType === 'list') {
        //     setListFormData({ ...listFormData, imageFile: imageFilefromUpload, isloading: setLoading });
        // } else {
        //     setAuctionFormData({ ...auctionFormData, imageFile: imageFilefromUpload, isloading: setLoading });
        // }
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

    const handleMint = async () => {
        console.log('mint info:', mintInfo);

        const imgCID = await uploadToIpfs(mintInfo.fileType)

        const json = {
            description: mintInfo.description,
            name: mintInfo.name,
            image: `ipfs://${imgCID}`,
        }

        console.log(JSON.stringify(json))
        const tokenURI = await uploadJson(json)
        console.log("token URI : ", tokenURI)
        return tokenURI

    }

    const handleListFormSubmit = async () => {
        console.log('List NFT Form Data:', listFormData);
        // const success = await listNFT(wallet!, listFormData, setLoading);
        // if (success) {

        //     console.log('NFT listed successfully!');

        // } else {
        //     console.error('Failed to list NFT!');
        // }
    }
    const handleAuctionFormSubmit = async () => {
        console.log('Auction NFT Form Data:', auctionFormData);

        // const success = await auctionNFT(wallet!, auctionFormData, setLoading);
        // if (success) {

        //     console.log('NFT listed for auction sucessfully!');

        // } else {
        //     console.error('Failed to aucion NFT!');
        // }
    }

    useEffect(() => {
        if (tab == 0) {
            setBgName('Subtract.png')
        } else if (tab == 1) {
            setBgName('Subtract1.png')
        } else {
            setBgName('Subtract2.png')
        }
    }, [tab])

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <ReactLoading type='spinningBubbles' color='#5D3068' height={175} width={175} />
            </div>
        )
    } else {
        return (
            <StyleBody>
                <Header />
                <PageBody>
                    <MainTab1 $bg={bgName}>
                        <TabHeader>
                            <HeaderChildActive onClick={() => setTab(0)}>
                                List NFT
                            </HeaderChildActive>
                            <HeaderChild onClick={() => setTab(1)}>
                                Auction NFT
                            </HeaderChild>
                            <HeaderChild onClick={() => setTab(2)}>
                                Mint NFT
                            </HeaderChild>
                        </TabHeader>
                        {
                            tab == 0 && (
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
                            )
                        }
                        {
                            tab == 1 && (
                                <TabBody>
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
                                                    <LabelNam htmlFor="">Minimum bid</LabelNam>
                                                    <TabInput
                                                        type="text"
                                                        placeholder="Enter the minimum bid amount"
                                                        onChange={(e) => setAuctionFormData({ ...auctionFormData, minAmount: e.target.value })}
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
                                                        <LabelNam htmlFor="">Minimum Bid Increament</LabelNam>
                                                        <TabInput
                                                            type="number"
                                                            placeholder="0.1"
                                                            onChange={(e) => setAuctionFormData({ ...auctionFormData, minBidIncreament: e.target.value })}
                                                        />
                                                    </LabelTextDiv>
                                                    {/* <LabelTextDiv>
                                                        <LabelNam htmlFor="">Max</LabelNam>
                                                        <TabInput
                                                            type="number"
                                                            placeholder="0.1"
                                                            onChange={(e) => setAuctionFormData({ ...auctionFormData, max: e.target.value })}
                                                        />
                                                    </LabelTextDiv> */}
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
                        {
                            tab == 2 && (
                                <TabBody>
                                    <MainDiv>
                                        <ImageDivCol>
                                            <CustomFile>
                                                Image Upload
                                                <input
                                                    type="file"
                                                    //   className="d-none"
                                                    // @ts-ignore
                                                    onChange={(e) => handleImageUpload(e)}
                                                // onChange={(e) => setVotingImage(e.target.files[0])}
                                                />
                                            </CustomFile>
                                            {
                                                mintInfo && (
                                                    //@ts-ignore
                                                    <img src={mintInfo.imageFile} width={100} alt="" style={{ width: '100%' }} />
                                                )
                                            }
                                        </ImageDivCol>
                                        <MainContainer>
                                            <MainRow>
                                                <LabelTextDiv>
                                                    <LabelNam htmlFor="">NFT name</LabelNam>
                                                    <TabInput
                                                        type="text"
                                                        placeholder="Enter the NFT  name"
                                                        onChange={(e) => setMintInfo({ ...mintInfo, name: e.target.value })}
                                                    />
                                                </LabelTextDiv>
                                                <LabelTextDiv>
                                                    <LabelNam htmlFor="">Description</LabelNam>
                                                    <TabInput
                                                        type="text"
                                                        placeholder="Enter the nft description"
                                                        onChange={(e) => setMintInfo({ ...mintInfo, description: e.target.value })}
                                                    />
                                                </LabelTextDiv>
                                            </MainRow>
                                            {/* <MainRow>
                                                <LabelTextDiv>
                                                    <LabelNam htmlFor="">Payment Token Address</LabelNam>
                                                    <TabInput
                                                        type="text"
                                                        placeholder="Enter the payment token address"
                                                        onChange={(e) => setAuctionFormData({ ...auctionFormData, paymentTokenAddress: e.target.value })}
                                                    />
                                                </LabelTextDiv>
                                                <LabelTextDiv>
                                                    <LabelNam htmlFor="">Minimum bid</LabelNam>
                                                    <TabInput
                                                        type="text"
                                                        placeholder="Enter the minimum bid amount"
                                                        onChange={(e) => setAuctionFormData({ ...auctionFormData, minAmount: e.target.value })}
                                                    />
                                                </LabelTextDiv>
                                            </MainRow> */}

                                            <SaveBtn onClick={handleMint}>
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

}

export default NFTList;
