import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import Globalstyles from "styles/Global-Styles";
import Router from "routes";
import { ModalProvider } from "contexts/ModalProvider";
import WalletModal from "components/modal/walletModal";
import { Web3OnboardProvider, init } from '@web3-onboard/react'
import { ConnectModalOptions } from "@web3-onboard/core/dist/types";
import luksoModule from "@lukso/web3-onboard-config";
import injectedModule from '@web3-onboard/injected-wallets';



const appMetadata = {
  name: "Hominoids",
  // icon: appLogoSvg,
  // logo: appLogoSvg,
  description: "NFT listing and auction",
  recommendedInjectedWallets: [
    {
      name: "Universal Profiles",
      url: "https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl=en",
    },
  ],
};


const chains = [
  // mainet not provided for demo
  // {
  //   id: 42,
  //   token: "LYX",
  //   label: "LUKSO Mainnet",
  //   rpcUrl: "https://lukso.rpc.thirdweb.com",
  // },
  // testnet
  {
    id: 4201,
    token: "LYXt",
    label: "LUKSO Testnet",
    // rpcUrl: "https://rpc.testnet.lukso.gateway.fm",
    rpcUrl: "https://rpc.testnet.lukso.network",
  },
];

// initialize the module
const lukso = luksoModule();

const luksoInjected = injectedModule({
  custom: [lukso],
  sort: (wallets) => {
    const sorted = wallets.reduce<any[]>((sorted, wallet) => {
      if (wallet.label === "Universal Profiles") {
        sorted.unshift(wallet);
      } else {
        sorted.push(wallet);
      }
      return sorted;
    }, []);
    return sorted;
  },
  displayUnavailable: ["Universal Profiles"],
});

const connect: ConnectModalOptions = {
  iDontHaveAWalletLink:
    "https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl=en",
  removeWhereIsMyWalletWarning: true,
};


const web3Onboard = init({
  wallets: [luksoInjected],
  chains: chains,
  appMetadata: appMetadata,
  connect: connect,
});



function App() {
  return (
    <>
      <Web3OnboardProvider web3Onboard={web3Onboard}>
        <ModalProvider>
          <Globalstyles />
          <BrowserRouter>
            <Router />
          </BrowserRouter>
          <WalletModal />
        </ModalProvider>
      </Web3OnboardProvider>

    </>
  );
}

export default App;
