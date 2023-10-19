import classNames from "classnames/bind";
import style from './Slider.module.scss';
import { MdNavigateNext } from 'react-icons/md';
import { useEffect, useState } from "react";

const cx = classNames.bind(style);

const slideItems = [
    require('../../assets/images/slider/slide1.png'),
    require('../../assets/images/slider/slide2.jpg'),
    require('../../assets/images/slider/slide3.png'),
]

function Slider() {

    const [current, setCurrent] = useState(0);
    const [isNext, setIsNext] = useState(false);
    const [isPrev, setIsPrev] = useState(false);

    // handle auto play slider
    useEffect(() => {
        let timeId = setTimeout(nextSlider, 3000);
        return () => clearTimeout(timeId);
    }, [current])

    const nextSlider = () => {
        setCurrent(current === slideItems.length - 1 ? 0 : current + 1);
        setIsNext(true);
        setIsPrev(false);
    };

    const prevSlider = () => {
        setCurrent(current === 0 ? slideItems.length - 1 : current - 1);
        setIsPrev(true);
        setIsNext(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slider-list')}>
                {slideItems.map((slideItem, index) => (
                    <div
                        className={cx('slider-item', {
                            'next-active': isNext && index === current,
                            'prev-active': isPrev && index === current
                        })}
                        key={index}
                    >
                        {index === current && <img src={slideItem} />}
                    </div>
                ))}
            </div>
            <div className={cx('dots')}>
                {Array.from({ length: 3 }).map((item, index) => (
                    <div
                        key={index}
                        className={cx('dot', { active: index === current })}>
                    </div>
                ))}
            </div>
            <div className={cx('prev-btn')} onClick={prevSlider}><MdNavigateNext className={cx('prev-icon')} /></div>
            <div className={cx('next-btn')} onClick={nextSlider} ><MdNavigateNext /> </div>
        </div >
    )
}
export default Slider;