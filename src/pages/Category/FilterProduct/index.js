import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import style from './FilterProduct.module.scss';
const cx = classNames.bind(style);

const prices = ['Tất cả', 'Dưới 10 triệu', 'Từ 10 đến 20 triệu', 'Từ 20 đến 30 triệu', 'Trên 30 triệu'];
const memorys = ['64GB', '128GB', '256GB'];
const colors = ['Trắng', 'Đen', 'Vàng'];

function FilterProduct({ data, filterResult, resetCheckId }) {

    const navigate = useNavigate();

    const [filterPrice, setFilterPrice] = useState(JSON.parse(localStorage.getItem('filter_price')) || []);
    const [filterColor, setFilterColor] = useState([]);
    const [filterMemory, setFilterMemory] = useState([]);

    const [checkedPrice, setCheckedPrice] = useState(+localStorage.getItem('filter_price_id') || 0);
    const [checkedMemory, setCheckedMemory] = useState(JSON.parse(localStorage.getItem('filter_memory_id')) ?? -1);
    const [checkedColor, setCheckedColor] = useState(JSON.parse(localStorage.getItem('filter_color_id')) ?? -1);

    const itemHasMemory = data.every((item) => item.memory);


    useEffect(() => {
        if (resetCheckId) {
            setCheckedPrice(0);
            setFilterPrice(data);
            setCheckedColor(null);
            setCheckedMemory(null);
            localStorage.setItem('filter_price_id', 0)
        }
    }, [resetCheckId])


    useEffect(() => {
        filterResult(filterPrice);
    }, [filterPrice]);


    useEffect(() => {
        filterResult(filterColor);

    }, [filterColor]);


    useEffect(() => {
        filterResult(filterMemory);
    }, [filterMemory]);


    const handleFilterPrice = (price, index) => {

        let result;
        const ten_million = 10000000;
        const twenty_million = 20000000;
        const thirty_million = 30000000;

        setCheckedPrice(index);
        setCheckedColor(null);
        localStorage.setItem('filter_price_id', index);

        switch (price) {
            case 'Tất cả':
                result = data.filter((item) => {
                    const price = item.price;
                    return (price > 0) && item;
                });
                setFilterPrice(result);
                navigate({ search: '?price=all' });
                localStorage.setItem('data_filter', JSON.stringify(result));
                localStorage.setItem('filter_price', JSON.stringify(result));
                break;
            case 'Dưới 10 triệu':
                result = data.filter((item) => {
                    const price = item.price;
                    return (price <= ten_million) && item;
                });
                setFilterPrice(result);
                navigate({ search: `?maxPrice=${ten_million}` });
                localStorage.setItem('data_filter', JSON.stringify(result));
                localStorage.setItem('filter_price', JSON.stringify(result));
                break;
            case 'Từ 10 đến 20 triệu':
                result = data.filter((item) => {
                    const price = item.price;
                    return (price >= ten_million && price <= twenty_million) && item;
                });
                setFilterPrice(result);
                navigate({ search: `?minPrice=${ten_million}&maxPrice=${twenty_million}` });
                localStorage.setItem('data_filter', JSON.stringify(result));
                localStorage.setItem('filter_price', JSON.stringify(result));
                break;
            case 'Từ 20 đến 30 triệu':
                result = data.filter((item) => {
                    const price = item.price;
                    return (price >= twenty_million && price <= thirty_million) && item;
                });
                setFilterPrice(result);
                navigate({ search: `?minPrice=${twenty_million}&maxPrice=${thirty_million}` });
                localStorage.setItem('data_filter', JSON.stringify(result));
                localStorage.setItem('filter_price', JSON.stringify(result));
                break;
            case 'Trên 30 triệu':
                result = data.filter((item) => {
                    const price = item.price;
                    return (price >= thirty_million) && item;
                });
                setFilterPrice(result);
                navigate({ search: `?minPrice=${thirty_million}` });
                localStorage.setItem('data_filter', JSON.stringify(result));
                localStorage.setItem('filter_price', JSON.stringify(result));
                break;
            default:
                break;
        }
    }


    const handleFilterMemory = (memory, index) => {

        let result;
        setCheckedMemory(index);
        localStorage.setItem('filter_memory_id', index);

        switch (memory) {
            case '64GB':
                result = filterPrice.filter((item) => item.memory === '64GB');
                setFilterMemory(result);
                navigate({ search: '?memory=64gb' });
                localStorage.setItem('data_filter', JSON.stringify(result));
                break;
            case '128GB':
                result = filterPrice.filter((item) => item.memory === '128GB');
                setFilterMemory(result);
                navigate({ search: '?memory=128gb' });
                localStorage.setItem('data_filter', JSON.stringify(result));
                break;
            case '256GB':
                result = filterPrice.filter((item) => item.memory === '256GB');
                setFilterMemory(result);
                navigate({ search: '?memory=256gb' });
                localStorage.setItem('data_filter', JSON.stringify(result));
                break;
            default:
                break;
        }
    }


    const handleFilterColor = (color, index) => {

        let result;
        setCheckedColor(index);
        localStorage.setItem('filter_color_id', index);

        switch (color) {
            case 'Trắng': {
                result = filterPrice.filter((item) => item.color === 'white')
                setFilterColor(result);
                navigate({ search: '?color=white' });
                localStorage.setItem('data_filter', JSON.stringify(result));
                break;
            }
            case 'Đen': {
                result = filterPrice.filter((item) => item.color === 'black')
                setFilterColor(result);
                navigate({ search: '?color=black' });
                localStorage.setItem('data_filter', JSON.stringify(result));
                break;
            }
            case 'Vàng': {
                result = filterPrice.filter((item) => item.color === 'gold')
                setFilterColor(result);
                navigate({ search: '?color=gold' });
                localStorage.setItem('data_filter', JSON.stringify(result));
                break;
            }
        }
    }


    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Lọc</h3>
            <ul className={cx('list')}>
                <span className={cx('title')}>Giá</span>
                {prices.map((price, index) => (
                    <li key={index} className={cx('item')} >
                        <input
                            type='radio'
                            checked={index === checkedPrice}
                            onChange={() => handleFilterPrice(price, index)}
                        />
                        <span className={cx('item-title')}>{price}</span>
                    </li>
                ))}
            </ul>
            {itemHasMemory && (
                <ul className={cx('list')}>
                    <span className={cx('title')}>Bộ nhớ</span>
                    {memorys.map((item, index) => (
                        <li key={index} className={cx('item')}>
                            <input
                                type='radio'
                                checked={index === checkedMemory}
                                onChange={() => handleFilterMemory(item, index)}
                            />
                            <span className={cx('item-title')}>{item}</span>
                        </li>
                    )
                    )}
                </ul>
            )}
            <ul className={cx('list')}>
                <span className={cx('title')}>Màu sắc</span>
                {colors.map((color, index) => (
                    <li key={index} className={cx('item')}>
                        <input
                            type='radio'
                            checked={index === checkedColor}
                            onChange={() => handleFilterColor(color, index)}
                        />
                        <span className={cx('item-title')}>{color}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default FilterProduct;