import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { GoReply } from 'react-icons/go'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import style from './Cart.module.scss';
import config from "../../config";
import CartItem from "./CartItem";
import { numberWithCommas } from "../../store/reducer";

const cx = classNames.bind(style);

function Cart() {

    const state = useSelector(state => state);
    const [isHasProduct, setIsHasProduct] = useState(state?.cartLength > 0 ? true : false);

    useEffect(() => {
        if (state?.cartLength > 0) {
            setIsHasProduct(true)
        } else {
            setIsHasProduct(false)
        }
    }, [state]);

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('heading')}>Giỏ hàng của bạn</h2>
            <span className={cx('count')}>{isHasProduct ? `Có ${state?.cartLength} sản phẩm` : 'Không có sản phẩm nào!'}</span>
            {isHasProduct && (
                <div className={cx('product-and-checkout')}>
                    <div className={cx('product-list')}>
                        {state?.cartItems?.map((item, index) => <CartItem item={item} index={index} />)}
                    </div>
                    <div className={cx('checkout')}>
                        <h3 className={cx('checkout-info')}>Thông tin đơn hàng</h3>
                        <div className={cx('checkout-total')}>
                            <span className={cx('checkout-total-text')}>Tổng tiền:</span>
                            <span className={cx('checkout-total-price')}>{numberWithCommas(state.totalPrice)}đ</span>
                        </div>
                        <div className={cx('checkout-text')}>
                            Phí vận chuyển sẽ được tính ở trang thanh toán.
                            Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.
                        </div>
                        <button className={cx('checkout-btn')}>THANH TOÁN</button>
                        <Link to={config.home}>
                            <span className={cx('keep-buying')}>
                                <GoReply className={cx('back-icon')} />
                                Tiếp tục mua hàng
                            </span>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Cart;