import { useEffect, useState } from "react";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx';

import classNames from "classnames/bind";
import style from './Pagination.module.scss';

const cx = classNames.bind(style);

function Pagination({ totalData, limitPage, currentPage, paginate }) {

    const [indexItem, setIndexItem] = useState(currentPage || 1);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalData / limitPage); i++) {
        pageNumbers.push(i)
    }

    const pageItems = [
        { name: 'prev', icon: <RxDoubleArrowLeft /> },
        ...pageNumbers,
        { name: 'next', icon: <RxDoubleArrowRight /> }
    ];

    useEffect(() => {
        if (currentPage === 1) {
            setIndexItem(currentPage);
        }
    }, [currentPage])

    useEffect(() => localStorage.setItem('current_page', indexItem), [indexItem])

    const handleClick = (item, index, arr) => {
        if (item.name) {
            if (item.name === 'prev') {
                if (indexItem !== arr[1]) {
                    setIndexItem(prev => prev - 1);
                    paginate(indexItem - 1);
                }
            }
            if (item.name === 'next') {
                if (indexItem !== (arr.length - 2)) {
                    setIndexItem(prev => prev + 1);
                    paginate(indexItem + 1);
                }
            }
        } else {
            setIndexItem(index);
            paginate(item);
        }
    }

    return (
        <ul className={cx("pagination")}>
            {pageItems.map((item, index, arr) => {
                if (totalData < limitPage) {
                    return;
                } else {
                    return (
                        <li className={cx("page-item")} key={index}>
                            <span
                                className={cx("page-link",
                                    {
                                        active: (index === 1 && indexItem === 1) || (index === indexItem),
                                        disabled: (index === 0 && indexItem === 1) || (index === (arr.length - 1) && indexItem === (arr.length - 2))
                                    })}
                                onClick={() => handleClick(item, index, arr)}
                            >
                                {item.icon ? item.icon : item}
                            </span>
                        </li>
                    )
                }
            })
            }
        </ul >
    )
}
export default Pagination;