import classNames from "classnames/bind";
import { BsClockFill } from 'react-icons/bs';
import { FaMapMarked, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import style from './Footer.module.scss';

const cx = classNames.bind(style);

const infos1 = [
    'Địa chỉ: A12, Đinh Tiên Hoàng, Q. Hoàn Kiếm, Hà Nội ',
    'Điện thoại: 0123456789 ',
    'Email: contact@yourdomain.com'
];

const infos2 = [
    { icon: <FaMapMarked />, content: 'Xem bản đồ đường đi' },
    { icon: <FaPhoneAlt />, content: 'Điện thoại: 0123 456 789' },
    { icon: <FaMapMarkerAlt />, content: 'Địa chỉ: A12, Đinh Tiên Hoàng, Hoàn Kiếm, Hà Nội' },
    { icon: <MdEmail />, content: 'Email: contact@yourdomain.com' },
    { icon: <BsClockFill />, content: 'Giờ mở cửa: Các ngày trong tuần: 9h00 - 22h00' },
];

const infos3 = [
    'Gọi mua: 0123456789 (7:30 - 22:00)',
    'Kỹ thuật: 0123456789 (7:30 - 22:00)',
    'Khiếu nại: 0123456789 (8:00 - 21:30)',
    'Bảo hành: 0123456789 (8:00 - 21:00)',
];


function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className='grid'>
                <div className={cx('inner')}>
                    <div className='row'>
                        <div className='col-l-4 col-m-6 col-s-12 '>
                            <h3 className={cx('title')}>QHSHOP</h3>
                            <div className={cx('infos')}>
                                {infos1.map((item, index) => <span key={index} className={cx('info-item')}>{item}</span>)}
                            </div>
                        </div>
                        <div className='col-l-4 col-m-6 col-s-12'>
                            <h3 className={cx('title')}>CỬA HÀNG</h3>
                            <div className={cx('infos')}>
                                {infos2.map((item, index) => (
                                    <div key={index} className={cx('infos2')}>
                                        <span key={index} className={cx('info-icon')}>{item.icon}</span>
                                        <span key={index} className={cx('info-item')}>{item.content}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='col-l-4 col-m-12 col-s-12'>
                            <h3 className={cx('title')}>TỔNG ĐÀI HỖ TRỢ</h3>
                            <div className={cx('infos')}>
                                {infos3.map((item, index) => <span key={index} className={cx('info-item')}>{item}</span>)}
                            </div>
                        </div>
                    </div>
                    <div className={cx('copyright')}>
                        <p className={cx('copyright-text')}>© Copyright QHShop.</p>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Footer;