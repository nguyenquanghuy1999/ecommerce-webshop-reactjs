import { BsCart2 } from 'react-icons/bs'
import classNames from "classnames/bind";
import style from './ProductItem.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useContext, useEffect, useState } from 'react';

import { addProductToCart } from '../../store/actions'
import ToastMessage from '../ToastMessage';
import { AuthUserContext } from '../../providers/AuthUser';
import { ModalContext } from '../../providers/Modal';
import { numberWithCommas } from '../../store/reducer';

const cx = classNames.bind(style);

function ProductItem({ data, width = 200, height = 200, currentPage }) {

    const { item, category, pathname } = data;

    const { currentUser } = useContext(AuthUserContext);
    const { modalOpen } = useContext(ModalContext)

    const dispatch = useDispatch();

    const [showToastMessage, setShowToastMessage] = useState(false);

    // handle after 3s hide toast message
    useEffect(() => {
        let timeId = setTimeout(() => setShowToastMessage(false), 2000);
        return () => clearTimeout(timeId);
    }, [showToastMessage])

    const handleClickCart = (e) => {
        e.preventDefault();
        if (currentUser) {
            if (!showToastMessage) {
                setShowToastMessage(true);
                dispatch(addProductToCart({ ...item, quantity: 1, totalPrice: item.price }));
            }
        } else {
            modalOpen();
        }
    }

    return (
        <Link to={pathname ? item?.name : `category/${category}/${item?.name}`} state={{ item, currentPage }} >
            <div className={cx('wrapper')}>
                <img width={width} height={height} src={item?.img} />
                <div className={cx('info')}>
                    <span className={cx('name')}>{item?.name}</span>
                    <span className={cx('price')}>{numberWithCommas(item?.price)}đ</span>
                </div>
                <div className={cx('add-to-cart')} onClick={handleClickCart}> <BsCart2 /> </div>
                {showToastMessage && <ToastMessage />}
            </div>
        </Link >
    )
}
export default ProductItem;