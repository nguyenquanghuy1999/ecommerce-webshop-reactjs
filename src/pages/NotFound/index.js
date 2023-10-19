import { Link } from "react-router-dom";

import config from '../../config'
import classNames from "classnames/bind";
import style from './NotFound.module.scss';


const cx = classNames.bind(style);

function NotFound() {
    return (
        <div className={cx('wrapper')}>
            <img src={require('../../assets/images/404.jpg')} />
            <Link to={config.home}>
                <button className={cx('btn-back')}>Quay lại trang chủ</button>
            </Link>
        </div>
    )
}
export default NotFound;

