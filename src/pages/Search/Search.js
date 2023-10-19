import classNames from "classnames/bind";
import { useLocation } from "react-router-dom";
import ProductItem from "../../components/ProductItem/ProductItem";
import style from './Search.module.scss';


const cx = classNames.bind(style);

function Search() {

    const location = useLocation();
    const pathname = location.pathname;
    const data = location.state?.data;
    const keyword = location.state?.key;
    const dataLength = location.state?.data.length;


    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Tìm kiếm với từ khóa - {keyword} </h3>
            <h3 className={cx('title')}>Các sản phẩm tìm kiếm ({dataLength ? dataLength : 0} sản phẩm)</h3>
            <div className={cx('body')}>
                <div className='grid'>
                    <div className='row'>
                        {data?.map((item, index) => (
                            <div className='col-l-3 col-m-4 col-s-6' key={index}>
                                <ProductItem data={{ item, pathname }} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Search;