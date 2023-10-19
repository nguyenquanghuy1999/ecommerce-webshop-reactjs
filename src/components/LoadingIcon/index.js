import classNames from "classnames/bind";
import style from './LoadingIcon.module.scss';
import { SiSpinrilla } from 'react-icons/si'

const cx = classNames.bind(style);

function LoadingIcon() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <SiSpinrilla className={cx('icon')} />
            </div>
        </div>
    )
}
export default LoadingIcon;