import { BrowserRouter } from "react-router-dom";

import Globalstyles from "styles/Global-Styles";
import Router from "routes";
import { ModalProvider } from "contexts/ModalProvider";
import WalletModal from "components/modal/walletModal";

function App() {
  return (
    <>
      <ModalProvider>
        <Globalstyles />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <WalletModal />
      </ModalProvider>
    </>
  );
}

export default App;
