import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalProvider";
import {
    Active,
    ActiveBtn,
    Bitget,
    BgScreen,
    BtnBox,
    Coinbase,
    CloseBtn,
    Description,
    OKX,
    FullDiv,
    H_31,
    IndBtn,
    Line,
    Meta,
    ModalContainer,
    SpanText,
    TitleBox,
} from "./wallet.styled";

const closeSign = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
    >
        <path
            d="M18 6.5L6 18.5"
            stroke="#6A467E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M6 6.5L18 18.5"
            stroke="#6A467E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
const Btns = [
    { img: <Meta />, text: "Metamask" },
    { img: <Coinbase />, text: "Coinbase" },
    { img: <OKX />, text: "OKX" },
    { img: <Bitget />, text: "Bitget" },
];

const WalletModal = () => {

    //@ts-ignore
    const { isModalVisible, setModalVisible } = useContext(ModalContext);

    const onBgClick = () => {
        setModalVisible(false);
    };

    const onModalClick = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
    };

    if (!isModalVisible) {
        return (<></>)
    } else {
        return (
            <FullDiv onClick={onBgClick}>
                <BgScreen>
                    <ModalContainer onClick={onModalClick}>
                        <TitleBox>
                            <H_31>Connect a wallet to continue</H_31>
                            <CloseBtn onClick={() => setModalVisible(false)}>
                                {closeSign}
                            </CloseBtn>
                        </TitleBox>
                        <Line />
                        <Description>
                            Choose how you want to connect. If you don't have a wallet, you
                            can select a provider and create one
                        </Description>
                        <BtnBox>
                            {Btns.map((btn, ind) => {
                                return (
                                    <IndBtn key={ind}>
                                        {btn.img}
                                        <SpanText>{btn.text}</SpanText>
                                        <ActiveBtn>
                                            <Active />
                                        </ActiveBtn>
                                    </IndBtn>
                                );
                            })}
                        </BtnBox>
                    </ModalContainer>
                </BgScreen>
            </FullDiv>
        )
    }
}

export default WalletModal