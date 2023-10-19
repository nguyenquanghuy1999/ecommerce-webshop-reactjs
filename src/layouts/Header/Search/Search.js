import Tippy from '@tippyjs/react/headless';
import { HiMagnifyingGlass } from 'react-icons/hi2'
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';

import allProduct from '../../../data/products';
import style from './Search.module.scss';
import { useDebounce } from '../../../hooks';
import { numberWithCommas } from '../../../store/reducer';

const cx = classNames.bind(style);

function Search({ active }) {

    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState([]);
    const [showSearchResult, setShowSearchResult] = useState(false);

    const debounceValue = useDebounce(inputValue.trim(), 300);
    const [hiddenSearch, setHiddenSearch] = useState(false);


    // handle filter product        
    useEffect(() => {
        const result = allProduct.filter(item => {
            if (inputValue.length >= 2) {
                return item.name.match(new RegExp(debounceValue, 'i'));
            }
        })
        setData(result);
        setShowSearchResult(true);
    }, [debounceValue])

    // handle when press enter in input will navigate  to page search
    useEffect(() => {
        const handleKey = e => {
            if (e.key === 'Enter') {
                if (inputValue) {
                    navigate({
                        pathname: '/search',
                        search: `?q=${inputValue}`
                    }, { state: { data, key: inputValue } });
                    handleResetInput();
                }
            }
        }
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [data])

    const handleResetInput = () => {
        setInputValue('');
        setShowSearchResult(false);
        setHiddenSearch(true);
    };

    const handleClickItemSearch = (item) => {
        navigate({
            pathname: `/search/${item.name}`,
        }, { state: { item } });
        handleResetInput();
    }

    return (
        <Tippy
            interactive
            placement='bottom-start'
            maxWidth={100}
            visible={data.length > 0 && showSearchResult}
            onClickOutside={() => setShowSearchResult(false)}
            render={(attrs) => (
                <div className={cx('search-result')}  {...attrs}>
                    <span className={cx('search-text')}>Kết quả tìm kiếm: {data.length} sản phẩm</span>
                    <div className={cx('search-list')}>
                        {data.map((item, index) => (
                            <div key={index} className={cx('search-item')} onClick={() => handleClickItemSearch(item)}>
                                <img className={cx('search-item-img')} src={item.img} />
                                <div className={cx('search-item-infos')}>
                                    <span className={cx('search-item-name')}>{item.name}</span>
                                    <span className={cx('search-item-price')}>{numberWithCommas(item.price)}đ</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link to={`/search?q=${inputValue}`} state={{ data, key: inputValue }} >
                        <span
                            className={cx('btn-view-all')}
                            onClick={handleResetInput}
                        >
                            Xem tất cả
                        </span>
                    </Link>
                </div>
            )}>
            <div className={cx('search', { hidden: hiddenSearch, active })}>
                <input
                    value={inputValue}
                    placeholder='Tìm kiếm'
                    onChange={e => setInputValue(e.target.value)}
                    onFocus={() => setShowSearchResult(true)}
                />
                {inputValue && data.length > 0 ?
                    <Link to={`/search?q=${inputValue}`} state={{ data, key: inputValue }} >
                        <span
                            className={cx('search-icon')}
                            onClick={handleResetInput}>
                            <HiMagnifyingGlass />
                        </span>
                    </Link>
                    :
                    <span className={cx('search-icon')}><HiMagnifyingGlass /></span>
                }
            </div>
        </Tippy >
    )
}
export default Search;