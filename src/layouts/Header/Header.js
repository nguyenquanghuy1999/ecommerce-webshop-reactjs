import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { signOut } from 'firebase/auth';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMagnifyingGlass } from 'react-icons/hi2';

import { auth } from '../../Firebase';
import imgUserDefault from '../../assets/images/img-user-default.jpg';
import { PhoneIcon, UserIcon } from '../../components/Icons';
import config from '../../config';
import { AuthUserContext } from '../../providers/AuthUser';
import { ModalContext } from '../../providers/Modal';
import Cart from './Cart';
import style from './Header.module.scss';
import Navbar from './Navbar';
import Search from './Search';
import Sidebar from './Sidebar';

const cx = classNames.bind(style);

function Header() {

    const { modalOpen } = useContext(ModalContext);
    const { currentUser } = useContext(AuthUserContext);

    const [isSearch, setIsSearch] = useState(false);
    const userIconRef = useRef();
    const phoneIconRef = useRef();

    const navigate = useNavigate();

    // handle in tablet and mobile
    useEffect(() => {
        phoneIconRef.current.href = 'tel:  0123 456 789';
        // handle click user icon open form login
        if (window.innerWidth < 740 || window.innerWidth < 1024) {
            userIconRef.current?.addEventListener('click', modalOpen);
        }
        return () => userIconRef.current?.removeEventListener('click', modalOpen);
    }, [currentUser])


    const handleLogout = async () => {
        await signOut(auth);
        navigate('/');
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Sidebar
                    modalOpen={modalOpen}
                    currentUser={currentUser}
                    onLogout={handleLogout}
                />
                <Link to={config.home} className={cx('logo-link')}>
                    <img className={cx('logo')} src={require('../../assets/images/logo.png')} />
                </Link>
                <span className={cx('search-icon')} onClick={() => setIsSearch(!isSearch)}><HiMagnifyingGlass /></span>
                <Search active={isSearch} />
                <div className={cx('phone-wrap')}>
                    <a className={cx('phone-icon')} ref={phoneIconRef}> <PhoneIcon />  </a>
                    <div className={cx('phone')}>
                        <span className={cx('phone-text')}>Hotline</span>
                        <a href='tel: 0123 456 789' className={cx('phone-number')}>0123 456 789</a>
                    </div>
                </div>
                <Tippy
                    interactive
                    placement='bottom'
                    render={() => currentUser && (
                        <ul className={cx('user-option')}>
                            <li className={cx('user-option-item')}>Tài khoản của tôi</li>
                            <li className={cx('user-option-item')} onClick={handleLogout}>Đăng xuất</li>
                        </ul>
                    )}
                >
                    <div className={cx('user-account')}>
                        {currentUser ?
                            <img className={cx('user-img')} src={currentUser?.photoUrl ? currentUser.photoUrl : imgUserDefault} />
                            :
                            <span ref={userIconRef} >
                                <UserIcon className={cx('user-icon')} />
                            </span>
                        }
                        <div className={cx('account')}>
                            <span className={cx('acount-text')}>{currentUser ? 'Xin chào' : 'Tài khoản'}</span>
                            {currentUser ?
                                <span className={cx('username')}>{currentUser.name}</span>
                                :
                                <span className={cx('login')} onClick={() => modalOpen()}>Đăng nhập</span>
                            }
                        </div>
                    </div>
                </Tippy>
                
                <Cart />
            </div>
            <Navbar />
        </div >
    )
}
export default Header;