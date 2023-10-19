import classNames from "classnames/bind";
import style from './ToastMessage.module.scss';
import { FaCheckCircle } from 'react-icons/fa'

const cx = classNames.bind(style);

function ToastMessage() {

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <span className={cx('icon')}>
                    <FaCheckCircle style={{ display: 'block' }} />
                </span>
                <span className={cx('title')}>
                    Sản phẩm đã được thêm vào giỏ hàng
                </span>
            </div>
        </div>
    )
}
export default ToastMessage;