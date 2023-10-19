import classNames from "classnames/bind";
import { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import style from './ProductDetail.module.scss';
import { policyTop, policyBottom } from "../../data/policy";
import { addProductToCart } from '../../store/actions'
import ToastMessage from "../../components/ToastMessage";
import config from '../../config';
import { AuthUserContext } from "../../providers/AuthUser";
import { ModalContext } from "../../providers/Modal";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { numberWithCommas } from "../../store/reducer";
import { useDispatch, useSelector } from "react-redux";

const cx = classNames.bind(style);

function ProductDetail() {

    const { currentUser } = useContext(AuthUserContext);
    const { modalOpen } = useContext(ModalContext);

    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const [count, setCount] = useState(1);
    const [isDescMore, setIsDescMore] = useState(false);
    const [isDescLess, setIsDescLess] = useState(true);
    const [showToastMessage, setShowToastMessage] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const data = location.state?.item;
    const currentPage = location.state?.currentPage;

    const [totalPrice, setTotalPrice] = useState(data?.price);


    useEffect(() => {
        if (location.state === null) {
            navigate(config.notFound)
        }
    }, [])

    // handle when comp mounted doccument always at the top
    useEffect(() => window.scroll({ top: 0 }), []);

    // handle after 3s hide toast message
    useEffect(() => {
        let timeId = setTimeout(() => setShowToastMessage(false), 2000);
        return () => clearTimeout(timeId);
    }, [showToastMessage])


    useEffect(() => {
        if (currentUser) {
            updateDoc(doc(db, 'users', currentUser.email), { infoCart: state });
        }
    }, [state])


    useEffect(() => {
        if (currentPage) {
            localStorage.setItem('current_page', currentPage)
        }
    }, [])

    const handleDescMore = () => {
        setIsDescMore(true);
        setIsDescLess(false);
    };

    const handleDescLess = () => {
        window.scrollTo({
            top: 500,
            behavior: 'smooth'
        });
        setIsDescLess(true);
        setIsDescMore(false);
    };

    const handleIncrease = () => {
        const price = data.price;
        setCount(count + 1);
        setTotalPrice(prev => prev + price)
    }

    const handleDecrease = () => {
        const price = data.price;
        if (count > 1) {
            setCount(count - 1)
            setTotalPrice(prev => prev - price)
        }
    }

    const handleAddProduct = (e) => {
        if (currentUser) {
            if (!showToastMessage) {
                setShowToastMessage(true);
                dispatch(addProductToCart({
                    ...data,
                    quantity: count,
                    totalPrice: totalPrice
                }));
            }
        } else {
            modalOpen();
            e.preventDefault();
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('content-left')}>
                    <img className={cx('img')} src={data?.img} />
                    <div className={cx('infos')}>
                        <span className={cx('name')}>{data?.name}</span>
                        <span className={cx('status')}> Tình trạng: <span>Còn hàng</span></span>
                        <span className={cx('price')}>{numberWithCommas(data?.price)}đ</span>
                        <div className={cx('quantity')}>
                            <button className={cx('decrease')} onClick={handleDecrease}>–</button>
                            <span className={cx('number')}>{count}</span>
                            <button className={cx('increase')} onClick={handleIncrease}>+</button>
                        </div>
                        <div className={cx('actions')}>
                            <button
                                className={cx('add-to-cart')}
                                onClick={handleAddProduct} >
                                THÊM VÀO GIỎ
                            </button>
                            <Link to={config.cart}>
                                <button className={cx('buy')} onClick={handleAddProduct}>MUA NGAY</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={cx('content-right')}>
                    <div className={cx('policy')}>
                        <div className={cx('policy-top')}>
                            <span className={cx('policy-top-text')}>YÊN TÂM MUA HÀNG</span>
                            <ul className={cx('policy-top-list')}>
                                {policyTop.map((policy, index) => (
                                    <li key={index} className={cx('policy-top-item')}>{policy}</li>
                                ))}
                            </ul>
                        </div>
                        <div className={cx('policy-bottom')}>
                            <span className={cx('policy-bottom-text')}>MIỄN PHÍ GIAO HÀNG</span>
                            <ul className={cx('policy-bottom-list')}>
                                {policyBottom.map((policy, index) => (
                                    <li key={index} className={cx('policy-bottom-item')}>{policy}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <div className={cx('description')}>
                <span className={cx('description-text')}>Mô tả</span>
                <div className={cx('description-inner')}>
                    <div className={cx('content', { 'isMore': isDescMore })}>
                        <p className={cx('content-header')}>{data?.details.desc_heading}</p>
                        <img className={cx('content-img')} src={data?.details.desc_heading_img} />
                        {data?.details.descs.map((desc, index) => (
                            <div key={index}>
                                <h2 className={cx('content-title')}>{desc.title}</h2>
                                <p className={cx('content-paragrap')}>{desc.content}</p>
                                <img className={cx('content-img')} src={desc.img} />
                            </div>
                        ))}
                    </div>
                    {isDescLess && <button className={cx('desc-more')} onClick={handleDescMore}>Xem Thêm</button>}
                    {isDescMore && <button className={cx('desc-less')} onClick={handleDescLess}>Ẩn bớt</button>}
                </div>
            </div>
            {showToastMessage && <ToastMessage />}
        </div >
    )
}

export default ProductDetail;