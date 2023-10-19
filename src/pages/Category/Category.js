import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import style from './Category.module.scss';
import {
    headphones,
    keyboards,
    laptops,
    mouses,
    smartphones,
    smartwatchs,
    tablets
} from "../../data/products";
import ProductItem from "../../components/ProductItem";
import Pagination from "./Pagination";
import FilterProduct from "./FilterProduct";
import SortProduct from "./SortProduct";

const cx = classNames.bind(style);

function Category() {

    const location = useLocation();
    // const category = location.state;
    const [category, setCategory] = useState(location.state);

    const pathname = window.location.pathname;
    const pathnameProduct = pathname.slice(10, pathname.length);


    const [isMobile, setIsMobile] = useState(false);

    const [data, setData] = useState(JSON.parse(localStorage.getItem('data')) || []);

    const [isDataDefault, setIsDatadefault] = useState(true);

    const [currentPage, setCurrentPage] = useState(+localStorage.getItem('current_page') || 1);
    const limitPage = 6;
    const indexFirstData = (currentPage - 1) * limitPage;
    const indexLastData = indexFirstData + limitPage;
    const currentData = data.slice(indexFirstData, indexLastData);

    const [filterProduct, setFilterProduct] = useState([]);
    const [isFilter, setIsFilter] = useState(false);
    const [resetCheckIdFilter, setResetCheckIdFilter] = useState(false);

    const [sortProduct, setSortProduct] = useState([]);
    const [isSort, setIsSort] = useState(false);
    const [resetSortType, setResetSortType] = useState(false);

    const filterPriceId = +localStorage.getItem('filter_price_id');



    const sortResult = data => {
        setIsDatadefault(false);
        setIsFilter(false);
        setIsSort(true)
        setSortProduct(data);
    }


    const filterResult = data => {
        setIsDatadefault(false);
        setIsSort(false);
        setIsFilter(true);
        setResetSortType(true);
        setFilterProduct(data);
    };


    const paginate = pageNumber => {
        setCurrentPage(pageNumber);
        setIsFilter(false);
        setResetCheckIdFilter(true);
        setResetSortType(true);
        setIsSort(false)
        setIsDatadefault(true)
        localStorage.removeItem('data_filter');
        localStorage.removeItem('filter_color_id');
        localStorage.removeItem('filter_price');
    };


    useEffect(() => {
        setResetSortType(false);
    }, [filterPriceId])


    useEffect(() => {
        const handleResize = () => {
            if (window.outerWidth <= 739) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

    }, [])


    useEffect(() => {
        if (currentPage) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return () => {
            setResetCheckIdFilter(false);
            setResetSortType(false);
        }
    }, [currentPage])


    useEffect(() => {
        switch (category) {
            case 'laptop':
                handleCategItem(laptops);
                break;
            case 'smartphone':
                handleCategItem(smartphones);
                break;
            case 'tablet':
                handleCategItem(tablets);
                break;
            case 'smartwatch':
                handleCategItem(smartwatchs);
                break;
            case 'headphone':
                handleCategItem(headphones);
                break;
            case 'computer-mouse':
                handleCategItem(mouses);
                break;
            case 'keyboard':
                handleCategItem(keyboards);
                break;
            default:
                setData([])
                break;
        }
        return () => {
            setResetCheckIdFilter(false);
        }
    }, [category]);


    // handle when enter pathname url
    useEffect(() => {
        setCategory(pathnameProduct)
    }, [pathnameProduct])



    useEffect(() => {
        return () => {
            localStorage.removeItem('current_page');
            localStorage.removeItem('filter_price');
        }
    }, [])


    useEffect(() => {
        const currentPageLocalStorage = localStorage.getItem('current_page');
        if (currentPageLocalStorage) {
            setCurrentPage(+currentPageLocalStorage);
            setIsDatadefault(true);
        }
        const dataFilterLocalStorage = JSON.parse(localStorage.getItem('data_filter'));
        if (dataFilterLocalStorage) {
            setIsDatadefault(false);
            setIsFilter(true);
            setFilterProduct(dataFilterLocalStorage);
        }
    }, [])


    const handleCategItem = (data) => {
        const datatLocal = localStorage.getItem('data');
        const filterPriceIdLocal = localStorage.getItem('filter_price_id');
        const dataFilterLocal = localStorage.getItem('data_filter');
        const filterColorIdLocal = localStorage.getItem('filter_color_id');

        if (datatLocal && filterPriceIdLocal && dataFilterLocal && filterColorIdLocal) {
            localStorage.removeItem('data');
            localStorage.removeItem('data_filter');
            localStorage.removeItem('filter_price_id');
            localStorage.removeItem('filter_color_id')
        }

        localStorage.setItem('data', JSON.stringify(data))

        setData(data);
        setIsFilter(false);
        setResetCheckIdFilter(true);
        setCurrentPage(1);
        setIsSort(false);
        setIsFilter(false);
        setIsDatadefault(true);
        window.scrollTo({ top: 0 });
    }


    const productItem = (item) => (
        <div className='col-l-3 col-m-4 col-s-6' key={item.id}>
            <ProductItem
                data={{ category, item, pathname: location.pathname }}
                currentPage={currentPage}
            />
        </div >
    )

    return (
        <div className={cx('wrapper')}>
            <div className='grid'>
                <div className='row'>
                    <div className='col-l-3 col-m-0 col-s-0'>
                        <FilterProduct
                            data={currentData}
                            filterResult={filterResult}
                            resetCheckId={resetCheckIdFilter}
                        />
                    </div>
                    <div className='col-l-9 col-s-12'>
                        <div className={cx('breadcrumb')}>
                            <span>Danh mục</span> / <span className={cx('breadcrumb-title')}>{category}</span>
                        </div>
                        <SortProduct
                            data={JSON.parse(localStorage.getItem('data_filter')) || currentData}
                            sortResult={sortResult}
                            resetSortType={resetSortType}
                        />
                        <div className={cx('product-list')}>
                            <div className='row'>
                                {isDataDefault && currentData.map((item) => productItem(item))}
                                {isFilter && filterProduct.map((item) => productItem(item))}
                                {isSort && sortProduct.map((item) => productItem(item))}
                            </div>
                        </div>
                        <Pagination
                            totalData={data.length}
                            limitPage={limitPage}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </div >
        </div >
    )
}
export default Category;
