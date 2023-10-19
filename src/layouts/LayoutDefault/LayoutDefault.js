import { useContext, useEffect } from "react";
import classNames from "classnames/bind";

import style from './LayoutDefault.module.scss';
import Footer from "../Footer";
import Header from "../Header";
import FormLogin from '../../components/FormLogin'
import { ModalContext } from "../../providers/Modal";
import Slider from "../Slider/Slider";

const cx = classNames.bind(style);

function LayoutDefault({ children }) {

    const { isLogin } = useContext(ModalContext);

    // handle when opening form won't scroll on the outside
    useEffect(() => {
        if (isLogin) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'scroll';
        }
    }, [isLogin])


    return (
        <div className={cx('wrapper')}>
            <Header />
            <Slider />
            <div className={cx('content')}>
                {children}
            </div>
            <Footer />
            {isLogin && <FormLogin />}
        </div >

    )
}

export default LayoutDefault;