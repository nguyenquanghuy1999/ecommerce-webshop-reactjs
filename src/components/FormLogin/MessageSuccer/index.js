import classNames from "classnames/bind";
import style from './MessageSuccer.module.scss';

const cx = classNames.bind(style);


function MessageSuccer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <span className={cx('title')}>Đăng nhập thành công</span>
            </div>
        </div>
    )
}
export default MessageSuccer;