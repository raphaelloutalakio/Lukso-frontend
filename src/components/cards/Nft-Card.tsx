import styled from "styled-components";
import logo from "../../assets/cards/hominids_mark.png";

import { ethers } from "ethers";
import { buyListedNft } from "backendConnectors/eraConnector";
import { useState } from "react";
import ReactLoading from 'react-loading';


const CardContainer = styled.div`
  margin: 120px 10px 0 10px;
  display: flex;
  width: 456px;
  height: 488px;
  position: relative;
  padding: 0px 28px 28px 28px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
  border-radius: 40px;
  border: 3px solid #5d3068;
  background: rgba(184, 128, 255, 0.04);
  box-shadow: 0px 2px 4px 0px rgba(255, 255, 255, 0.24) inset,
    0px 0px 68px 0px rgba(255, 255, 255, 0.05) inset;
  backdrop-filter: blur(30px);
  /* overflow: hidden; */
  @media (max-width: 768px) {
    /* width: 297px;
    height: 337px; */
    transform: scale(0.66);
    margin: 0 -60px;
  }
`;

const ContentBox = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Avatar = styled.div<{ $avatar: string }>`
  flex-shrink: 0;
  margin-left: 25px;
  width: 400px;
  height: 400px;
  position: relative;
  background-image: url(${(props) => props.$avatar});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 20px;
  /* margin-bottom: 150px; */

  /* background: unset url(${(props) =>
    props.$avatar}) no-repeat cover center; */
  /* @media (max-width: 560px) {
    width: 265px;
    height: 250px;
    margin-left: 15px;
  } */
`;

const Status = styled.div`
  width: 400px;
  height: 92px;
  padding: 0 20px;
  display: flex;
  justify-content: space-around;
  flex-shrink: 0;
  border-radius: 0px 0px 20px 20px;
  background: rgba(17, 16, 18, 0.6);
  backdrop-filter: blur(4px);
  position: absolute;
  bottom: 0;
  /* @media (max-width: 560px) {
    width: 265px;
    height: 60px;
    margin-left: 0;
  } */
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const UpperText = styled.div`
  color: #fff;
  font-feature-settings: "ss01" on;
  font-family: Lato;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Value = styled.div`
  color: #FF0000;
  text-align: right;
  font-family: Lato;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Partition = styled.div`
  margin-top: 20px;
  width: 0px;
  height: 44px;
  flex-shrink: 0;
  strokewidth: 1px;
  stroke: rgba(255, 255, 255, 0);
  width: 40px;
  text-align: center;
  justify-content: space-between;
  align-items: center;
`;

const Description = styled.div`
  color: #fff;
  font-family: Lato;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 25.2px */
  padding: 20px 28px;
`;

const FunctionBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 450px;
  height: 60px;
  padding: 0 28px;
  margin-bottom: 30px;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Logo = styled.div`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 1032.958px;
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-size: cover;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
`;

const CreatedBy = styled.div`
  color: #9d9999;
  font-feature-settings: "ss01" on;
  font-family: Lato;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Name = styled.div`
  color: #fff;
  text-align: right;
  font-family: Lato;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const MintButton = styled.div`
  display: flex;
  height: 59px;
  padding: 25px 40px;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  background: #af50bd;
  color: #fff;
  text-align: center;
  font-family: Lato;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    background-color: #af50bd50;
  }
  &:active {
    background-color: #af50bd;
    transform: translate(5px, 5px);
  }
  @media (max-width: 768px) {
    height: 43px;
    width: 150px;
    padding: 12px 32px;
  }
`;

const getShortenedAddress = (address) => {
  return `${address?.substring(0, 5)}...${address?.substring(address.length - 3)}`;
};

const formatTokenAmount = (amount, decimals) => {
  if (amount === null || amount === undefined || decimals === null || decimals === undefined) {
    return 'N/A'; // Return a default value or handle the case as needed
  }
  return ethers.formatUnits(amount, decimals);
};

export const NftCard = ({
  isFor,
  currentListItem,
  items,
  floorPrice,
  volume,
  isBuyButton,
  avatar,

}: {
  isFor: String;
  currentListItem;
  items: number;
  floorPrice: number;
  volume: number;
  isBuyButton: boolean;
  avatar: string;
}) => {

  const [isLoading, setLoading] = useState(false);

  const handleBuyNow = async (id: string, askedFor: string, paymentTokenAddr: string) => {

    console.log(`Buying item with ID: ${id, askedFor, paymentTokenAddr}`);

    const success = await buyListedNft(id, askedFor, paymentTokenAddr, setLoading);
    if (success) {

      console.log('NFT listed for auction sucessfully!');

    } else {
      console.error('Failed to aucion NFT!');
    }


  };

  const contentMap = {
    listNft: {
      content: (
        <ContentBox>
          <Avatar $avatar={avatar}>
            <Status>
              {/* <Text>
              <UpperText>Items</UpperText> <Value>{items}</Value>
            </Text> */}
              <Partition>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2"
                  height="44"
                  viewBox="0 0 2 44"
                  fill="none"
                >
                  <path
                    d="M1.25 0L1.25 44"
                    stroke="url(#paint0_linear_253_537)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_253_537"
                      x1="1.75"
                      y1="-2.18557e-08"
                      x2="1.75"
                      y2="44"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.0001" stopColor="white" stopOpacity="0" />
                      <stop offset="0.395833" stopColor="#AF50BD" />
                      <stop offset="0.583333" stopColor="#AF50BD" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </Partition>
              <Text>
                <UpperText>Asked for</UpperText>
                <Value>{formatTokenAmount(currentListItem?.[5], 18)} {currentListItem?.[9]}</Value>
              </Text>
              <Partition>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2"
                  height="44"
                  viewBox="0 0 2 44"
                  fill="none"
                >
                  <path
                    d="M1.25 0L1.25 44"
                    stroke="url(#paint0_linear_253_537)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_253_537"
                      x1="1.75"
                      y1="-2.18557e-08"
                      x2="1.75"
                      y2="44"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.0001" stopColor="white" stopOpacity="0" />
                      <stop offset="0.395833" stopColor="#AF50BD" />
                      <stop offset="0.583333" stopColor="#AF50BD" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </Partition>
              {/* <Text>
              <UpperText>Volume traded</UpperText>
              <Value>{volume}</Value>
            </Text> */}
            </Status>
          </Avatar>
          <Description>
            Suigoats is Dynamic collection of 7777&nbsp;NFT and The identity of
            Sui Network
          </Description>
          <FunctionBox>
            <ButtonBox>
              <Logo />
              <TextBox>
                <CreatedBy>Created by</CreatedBy>
                <Name>{getShortenedAddress(currentListItem?.[1])}</Name>
              </TextBox>
            </ButtonBox>
            {
              isBuyButton ? (
                <MintButton
                  onClick={() => handleBuyNow(currentListItem?.[0], (currentListItem?.[5]).toString(), currentListItem?.[4])}
                >
                  {!currentListItem?.[8] ? "SOLD" : "BUY NOW"}
                </MintButton>
              ) : (
                <MintButton disabled>MINT NOW</MintButton>
              )
            }


          </FunctionBox>
        </ContentBox>
      ),
      showLoading: isLoading,
    },

    // Add more cases for different values of isFor here
    auctionNft: {
      content: (
        <ContentBox>
          <Avatar $avatar={avatar}>
            <Status>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}></div>
              <Text>
                <UpperText>Items</UpperText> <Value>{items}</Value>
              </Text >


              <Partition>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2"
                  height="44"
                  viewBox="0 0 2 44"
                  fill="none"
                >
                  <path
                    d="M1.25 0L1.25 44"
                    stroke="url(#paint0_linear_253_537)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_253_537"
                      x1="1.75"
                      y1="-2.18557e-08"
                      x2="1.75"
                      y2="44"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.0001" stopColor="white" stopOpacity="0" />
                      <stop offset="0.395833" stopColor="#AF50BD" />
                      <stop offset="0.583333" stopColor="#AF50BD" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </Partition>

              <Text>
                <UpperText>Floor price</UpperText>
                <Value>{floorPrice}</Value>
              </Text>

              <Partition>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2"
                  height="44"
                  viewBox="0 0 2 44"
                  fill="none"
                >
                  <path
                    d="M1.25 0L1.25 44"
                    stroke="url(#paint0_linear_253_537)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_253_537"
                      x1="1.75"
                      y1="-2.18557e-08"
                      x2="1.75"
                      y2="44"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.0001" stopColor="white" stopOpacity="0" />
                      <stop offset="0.395833" stopColor="#AF50BD" />
                      <stop offset="0.583333" stopColor="#AF50BD" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </Partition>

              <Text>

                <UpperText>Volume traded</UpperText>
                <Value>{volume}</Value>
              </Text>



            </Status >
          </Avatar >


          <Description>
            Suigoats is Dynamic collection of 7777&nbsp;NFT and The identity of
            Sui Network
          </Description>

          

          <FunctionBox>
            <ButtonBox>
              <Logo />
              <TextBox>
                <CreatedBy>Created by</CreatedBy>
                <Name>Hominids</Name>
              </TextBox>
            </ButtonBox>
            {
              isBuyButton ? (<MintButton>BUY NOW</MintButton>) : (<MintButton>MINT NOW</MintButton>)
            }

          </FunctionBox>
        </ContentBox >
      ),
      showLoading: isLoading,
    },
  };

  const { content, showLoading } = contentMap[isFor] || { content: null, showLoading: false };



  return (
    <CardContainer>

      {content}
      {showLoading && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <ReactLoading type='spinningBubbles' color='#5D3068' height={175} width={175} />
        </div>
      )}

    </CardContainer >
  );
};
