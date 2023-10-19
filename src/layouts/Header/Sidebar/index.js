import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { BiMenu } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import { Link } from "react-router-dom";

import { PhoneIcon } from "../../../components/Icons";
import config from "../../../config";
import style from "./Sidebar.module.scss";
import { category } from "../../../data/category";

const cx = classNames.bind(style);

const items = ['Trang chủ', 'Giới thiệu', 'Tuyển dụng', 'Liên hệ'];

function Sidebar({ modalOpen, currentUser, onLogout }) {

    const [isCategory, setIsCategory] = useState(false);
    const [isSidebar, setIsSidebar] = useState(false);

    // handle when opening sidebar won't scroll on the outside
    useEffect(() => {
        if (isSidebar) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'scroll';
        }
    }, [isSidebar])

    const handleLogout = () => {
        onLogout();
        setIsSidebar(false);
    }

    const handleClickClose = () => {
        setIsCategory(false);
        setIsSidebar(false);
    }

    const handleLogin = () => {
        modalOpen();
        setIsSidebar(false);
    }

    return (
        <>
            <span className={cx('menu-icon')} onClick={() => setIsSidebar(true)}><BiMenu /> </span>
            <div className={cx('sidebar', { active: isSidebar })}>
                <div className={cx('sidebar-inner')}>
                    <div className={cx('category')}>
                        <span className={cx('category-text')} onClick={() => setIsCategory(!isCategory)}>Danh mục sản phẩm</span>
                        {isCategory ?
                            <span className={cx('arrow-top')}><AiFillCaretUp /></span>
                            :
                            <span className={cx('arrow-bottom')}><AiFillCaretDown /></span>
                        }
                        {isCategory && (
                            <ul className={cx('category-list')}>
                                {category.map((item, index) => (
                                    <Link to={`/category/${item.category}`} key={index} state={item.category}>
                                        <li className={cx('category-item')} onClick={() => setIsSidebar(false)}>
                                            <img className={cx('category-item-img')} src={item.image} />
                                            <span className={cx('category-item-name')}>{item.name}</span>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        )}
                    </div>
                    <ul className={cx('nav-list')}>
                        {items.map((item, index) => (
                            <Link to={config.home} key={index}>
                                <li className={cx('nav-item')}>{item}</li>
                            </Link>
                        ))}
                        {currentUser ? (<li className={cx('nav-item')} onClick={handleLogout}> {`Đăng xuất (${currentUser?.name})`} </li>)
                            :
                            (<li className={cx('nav-item')} onClick={handleLogin}> Đăng nhập</li>)
                        }
                    </ul>
                    <div className={cx('close-btn')} onClick={handleClickClose}><GrClose /></div>
                    <div className={cx('phone-wrap')}>
                        <PhoneIcon width={40} height={40} />
                        <div className={cx('phone', { active: isSidebar })}>
                            <span className={cx('phone-text')}>Hotline</span>
                            <a href='tel: 0123 456 789' className={cx('phone-number')}>0123 456 789</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Sidebar;