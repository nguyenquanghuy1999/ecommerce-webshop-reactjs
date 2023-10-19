import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { Link, useNavigate } from "react-router-dom";

import style from './Cart.module.scss';
import { CartIcon } from '../../../components/Icons'
import config from "../../../config";

import { removeProduct } from "../../../store/actions";
import { AuthUserContext } from "../../../providers/AuthUser";
import { ModalContext } from "../../../providers/Modal";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../Firebase";
import { numberWithCommas } from "../../../store/reducer";
import { useDispatch, useSelector } from "react-redux";

const cx = classNames.bind(style);

function Cart({ width, height }) {

    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const { modalOpen } = useContext(ModalContext)
    const { currentUser } = useContext(AuthUserContext);

    const [isCartList, setIsCartList] = useState(false);

    const navigate = useNavigate();

    useEffect(() => state?.cartItems?.length > 0 ? setIsCartList(true) : setIsCartList(false), [state]);


    useEffect(() => {
        if (currentUser) {
            updateDoc(doc(db, 'users', currentUser.email), { infoCart: state });
        }
    }, [state])

    const handleClickCart = () => {
        if (currentUser) {
            navigate(config.cart)
        } else {
            modalOpen();
        }
    }


    return (
        <Tippy
            interactive
            placement="bottom"
            offset={[-150, 10]}
            render={() => (
                <>
                    {currentUser && (<div className={cx('cart-inner')}>
                        {isCartList ?
                            <>
                                <div className={cx('cart-list')}>
                                    {state?.cartItems.map((item, index) => (
                                        <div key={index} className={cx('cart-item')}>
                                            <img className={cx('img')} src={item?.img} />
                                            <div className={cx('infos')}>
                                                <span className={cx('name')}>{item?.name}</span>
                                                <div className={cx('quantity-and-price')}>
                                                    <span className={cx('quantity')}>{`Số lượng: ${item.quantity}`}</span>
                                                    <span className={cx('price')}>{numberWithCommas(item?.totalPrice)}đ</span>
                                                </div>
                                                <span className={cx('remove')} onClick={() => dispatch(removeProduct(index))}>Xóa</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={cx('cart-total-price')}>
                                    <span className={cx('total-price-text')}>Thành tiền</span>
                                    <span className={cx('total-price')}>{numberWithCommas(state?.totalPrice)}đ</span>
                                </div>
                                <Link to={config.cart}> <button className={cx('view-cart-btn')}>Xem giỏ hàng</button></Link>
                            </>
                            :
                            (
                                <div className={cx('cart-empty')}>
                                    <img className={cx('no-cart-img')} src={require('../../../assets/images/no-cart.png')} />
                                    <span className={cx('cart-title')}>Giỏ hàng của bạn đang trống!</span>
                                </div>
                            )
                        }
                    </div>)}
                </>
            )
            }>
            <div className={cx('wrapper')} onClick={handleClickCart}>
                <CartIcon width={width} height={height} className={cx('cart-icon')} />
                {currentUser && <span className={cx('total')}>{state?.cartLength ? state.cartLength : 0}</span>}
            </div>
        </Tippy >
    )
}
export default Cart;