import { createContext, useState } from "react";

export const ModalContext = createContext();

function Modal({ children }) {

    const [isLogin, setIsLogin] = useState(false);

    const modalOpen = () => setIsLogin(true);
    const modalOff = () => setIsLogin(false);

    const data = {
        isLogin,
        modalOff,
        modalOpen
    }

    return (
        <ModalContext.Provider value={data}>
            {children}
        </ModalContext.Provider>
    )
}
export default Modal;