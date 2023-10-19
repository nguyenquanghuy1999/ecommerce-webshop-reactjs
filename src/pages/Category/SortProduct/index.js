import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { RxCaretDown } from 'react-icons/rx';

import style from './SortProduct.module.scss';

const cx = classNames.bind(style);

const sortList = ['Mặc định', 'Giá: Từ thấp đến cao', 'Giá: Từ cao đến thấp'];

function SortProduct({ data, sortResult, resetSortType }) {

    const [sortType, setSortType] = useState('Mặc định')
    const [isSortList, setIsSortList] = useState(true);

    useEffect(() => {
        if (resetSortType) {
            setSortType('Mặc định');
        }
    }, [resetSortType])


    const handleSortType = (item) => {

        let result;
        setSortType(item);

        switch (item) {
            case 'Mặc định':
                result = data.sort((a, b) => a.id - b.id);
                sortResult(result);
                break;
            case 'Giá: Từ thấp đến cao':
                result = data.sort((a, b) => {
                    a = a.price;
                    b = b.price;
                    return a - b;
                })
                sortResult(result);
                break;
            case 'Giá: Từ cao đến thấp':
                result = data.sort((a, b) => {
                    a = a.price;
                    b = b.price;
                    return b - a;
                })
                sortResult(result);
                break;
            default:
                break;
        }
    }


    return (
        <div className={cx('sort-product')}>
            <span className={cx('sort-by')}>Sắp xếp theo: </span>
            <Tippy
                interactive
                placement='bottom'
                offset={[0, 0]}
                render={(attrs) => (isSortList &&
                    (<div className={cx('sort-list')} tabIndex={-1} {...attrs}>
                        {sortList.map((item, index) => (
                            <div
                                key={index}
                                className={cx('sort-item')}
                                onClick={() => {
                                    setIsSortList(false);
                                    handleSortType(item);
                                }}
                            >
                                {item}
                            </div>
                        ))}
                    </div>))
                }
            >
                <div className={cx('sort')} onMouseMove={() => setIsSortList(true)}>
                    <span>{sortType}</span>
                    <RxCaretDown className={cx('caret-down')} />
                </div>
            </Tippy>
        </div>
    )
}
export default SortProduct;