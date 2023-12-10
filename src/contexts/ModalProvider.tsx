import { useState, ReactNode, createContext } from "react";

// Define the shape of the context
export interface ModalContextProps {
  isModalVisible: boolean;
  setModalVisible: Function;
}

// Create the Modal context
export const ModalContext = createContext<ModalContextProps | null>(null);

// Create the Modal context provider component
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <ModalContext.Provider
      value={{
        isModalVisible,
        setModalVisible,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
