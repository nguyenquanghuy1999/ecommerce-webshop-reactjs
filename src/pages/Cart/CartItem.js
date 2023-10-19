import classNames from "classnames/bind";
import { useContext, useEffect } from "react";
import { AiOutlineClose } from 'react-icons/ai'
import { doc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";

import { removeProduct, increase, decrease } from "../../store/actions";
import style from './Cart.module.scss';
import { db } from "../../Firebase";
import { AuthUserContext } from "../../providers/AuthUser";
import { numberWithCommas } from "../../store/reducer";

const cx = classNames.bind(style);

function CartItem({ item, index }) {

    const { currentUser } = useContext(AuthUserContext);

    const state = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser) {
            updateDoc(doc(db, 'users', currentUser.email), { infoCart: state });
        }
    }, [state]);

    return (
        <div key={index} className={(cx('product-item'))}>
            <img src={item.img} />
            <div className={cx('product-infos')}>
                <span className={cx('name')}>{item.name}</span>
                <span className={cx('price')}>{numberWithCommas(item.price)}đ</span>
                <div className={cx('quantity-and-total')}>
                    <div className={cx('quantity')}>
                        <button className={cx('decrease')} onClick={() => dispatch(decrease(index))}>–</button>
                        <span className={cx('number')}>{item.quantity}</span>
                        <button className={cx('increase')} onClick={() => dispatch(increase(index))}>+</button>
                    </div>
                    <div className={cx('total-price')}>{numberWithCommas(item.totalPrice)}đ</div>
                </div>
            </div>
            <div className={cx('close')}
                onClick={() => dispatch(removeProduct(index))}
            >
                <AiOutlineClose />
            </div>
        </div >
    )
}
export default CartItem;