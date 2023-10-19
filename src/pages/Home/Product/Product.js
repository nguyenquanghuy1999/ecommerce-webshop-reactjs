import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ProductItem from "../../../components/ProductItem";
import style from './Product.module.scss';

const cx = classNames.bind(style);


function Product({ data, title, category, bannerSrc, items = [] }) {

    const [imgLarge, setImgLarge] = useState(false);
    const [lessData, setLessData] = useState([]);
    const imgRef = useRef();


    useEffect(() => {
        if (window.innerWidth >= 1024) {
            if (imgRef.current.width > 300) {
                setImgLarge(true);
                setLessData(data.slice(0, 3));
            } else {
                setLessData(data.slice(0, 4));
            }

        }

        if (window.innerWidth <= 740 || window.innerWidth <= 1023) {
            switch (category) {
                case 'laptop': {
                    setLessData(data.slice(0, 4));
                    break;
                }
                case 'tablet': {
                    setLessData(data.slice(0, 3));
                    break;
                }
                case 'smartphone': {
                    setLessData(data.slice(0, 4));
                    break;
                }
                case 'smartwatch': {
                    setLessData(data.slice(0, 3));
                    break;
                }
                default:
                    break;
            }
        }
    }, [imgRef.current?.width])



    useEffect(() => {
        const handleResize = () => {
            imgRef.current.style.width = '100%';
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])


    return (
        <div className='grid'>
            <div className={cx('heading')}>
                <Link to={`category/${category}`} state={category}>
                    <h3 className={cx('title')}>{title}</h3>
                </Link>
                <ul className={cx('list')}>
                    {items.map((item, index) => (
                        <li key={index} className={cx('item')}>{item}</li>
                    ))}
                </ul>
            </div>
            <div className='row'>
                <div className={`${imgLarge ? 'col-l-5' : 'col-l-3'} col-m-12 col-s-12`}>
                    <img
                        ref={imgRef}
                        className={cx('image')}
                        src={bannerSrc}
                    />
                </div>
                <div className={`${imgLarge ? 'col-l-7' : 'col-l-9'} col-m-12 col-s-12`}>
                    <div className='row'>
                        {lessData.map((item, index) => (
                            <div className={`${!imgLarge ? 'col-l-3' : 'col-l-4'} col-m-4 col-s-6`} key={index}>
                                <ProductItem data={{ category, item }} />
                            </div>
                        ))}
                    </div>
                    <div className={cx('see-more')}>
                        <Link to={`category/${category}`} state={category} className={cx('see-more-link')}>
                            <div className={cx('see-more-btn')}> Xem thêm </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Product;