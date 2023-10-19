import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import style from './InputField.module.scss';
import { BiUser } from "react-icons/bi";
import { RiLock2Line } from "react-icons/ri";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const cx = classNames.bind(style);

function InputField({ field, form, placeholder, type }) {

    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const [isEyeOff, setIsEyeOff] = useState(false);
    const inputPassRef = useRef();

    const { name, value } = field;
    const { errors, touched, setFieldError } = form;
    const showError = errors[name] && touched[name];

    useEffect(() => {
        if (type === 'password') {
            if (value.length > 0) {
                if (isEyeOpen) {
                    setIsEyeOff(false)
                } else {
                    setIsEyeOff(true)
                }
            } else {
                setIsEyeOpen(false);
                setIsEyeOff(false);
                inputPassRef.current.type = 'password';
            }
        }
    }, [value])

    const handleEyeOpen = () => {
        inputPassRef.current.type = 'password';
        setIsEyeOpen(false);
        setIsEyeOff(true);
    }

    const handleEyeOff = () => {
        inputPassRef.current.type = 'text';
        setIsEyeOpen(true);
        setIsEyeOff(false);
    }

    return (
        <>
            <div className={cx('form-group', { invalid: showError })}>
                {name == 'name' && <BiUser className={cx('icon-user')} />}
                {name == 'email' && <HiOutlineMail className={cx('icon-email')} />}
                {(name == 'password' || name == 'confirmPassword') && <RiLock2Line className={cx('icon-lock')} />}
                <input
                    ref={type == 'password' ? inputPassRef : null}
                    name={name}
                    {...field}
                    className={cx('form-input')}
                    placeholder={placeholder}
                    type={type}
                    onClick={() => setFieldError(name, null)}
                />

                {isEyeOpen && <span className={cx('icon-eye-open')} onClick={handleEyeOpen}><FaRegEye /></span>}
                {isEyeOff && <span className={cx('icon-eye-off')} onClick={handleEyeOff}><FaRegEyeSlash /></span>}

            </div>
            {showError && <p className={cx('error-message')}>{errors[name]}</p>}
        </>
    )
}
export default InputField;