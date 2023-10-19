import { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { AiFillCloseCircle } from 'react-icons/ai'
import { RiErrorWarningFill } from 'react-icons/ri'
import { FastField, Form, Formik, } from 'formik'
import * as Yup from 'yup'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider
} from 'firebase/auth';


import { ModalContext } from "../../providers/Modal";
import style from './FormLogin.module.scss';
import InputField from "./InputField";
import { auth } from "../../Firebase";
import { AuthUserContext } from "../../providers/AuthUser";
import LoadingIcon from "../LoadingIcon";
import MessageSuccer from "./MessageSuccer";

const cx = classNames.bind(style);

function FormLogin() {

    const { modalOff } = useContext(ModalContext);
    const { setName } = useContext(AuthUserContext);

    const [loading, setLoading] = useState(false);
    const [isMessageSuccer, setIsMessageSuccer] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errValue, setErrValue] = useState('');
    const modalRef = useRef();


    useEffect(() => {
        const handleKeyIsEsc = e => e.key === 'Escape' && handleClose();
        window.addEventListener('keydown', handleKeyIsEsc)
        return () => window.removeEventListener('keydown', handleKeyIsEsc);
    }, [])


    const handleClose = () => {
        modalRef.current.animate([
            { opacity: 0, transform: 'scale(0)' }
        ], { duration: 200, fill: 'forwards' })
        setTimeout(() => modalOff(), 200)
    }



    const handleSignInGoolge = async () => {
        await signInWithPopup(auth, new GoogleAuthProvider);
        handlePromise();
    }

    const handleSignInFacebook = async () => {
        await signInWithPopup(auth, new FacebookAuthProvider);
        handlePromise();
    }


    const validationSchema = Yup.object({
        name: isRegister ? Yup.string().required('Vui lòng nhập tên người dùng!').min(6, 'Tối thiểu 6 kí tự!') : null,
        email: Yup.string().email('Email không hợp lệ!').required('Vui lòng nhập email!'),
        password: isRegister ? (Yup.string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
                "Mật khẩu phải gồm 8 kí tự trở lên. Có một chữ hoa, một chữ thường, và một số."
            )
            .required('Vui lòng nhập mật khẩu!'))
            :
            (Yup.string().required('Vui lòng nhập mật khẩu!')),

        confirmPassword: isRegister ? (Yup.string()
            .required('Vui lòng nhập lại mật khẩu!')
            .oneOf([Yup.ref('password'), null], 'Nhập lại mật khẩu không đúng!'))
            : null
    })


    const handleError = error => {
        if (error.message.includes('email-already-in-use')) {
            setErrValue('Email đã tồn tại. Vui lòng thay đổi email khác!')
        } else if (error.message.includes('auth/too-many-requests')) {
            setErrValue(`Quyền truy cập vào tài khoản này đã tạm 
            thời bị vô hiệu hóa do nhiều lần đăng nhập không thành công. 
            Bạn có thể thử lại sau vài phút.`)
        } else if (error.message.includes('network-request-failed')) {
            setErrValue('Vui lòng kiểm tra kết nối mạng!');
        } else setErrValue('Email hoặc Mật khẩu không đúng!');

    }

    const handlePromise = () => {
        const promise = ms => new Promise(resolve => setTimeout(resolve, ms));
        promise(0)
            .then(() => {
                setIsMessageSuccer(true);
                return promise(1500)
            })
            .then(() => modalOff())

    }

    const handleSubmit = async result => {
        setLoading(true);
        try {
            if (isRegister) {
                await createUserWithEmailAndPassword(auth, result.email, result.password);
                setLoading(false);
                setName(result.name);
                handlePromise();

            } else {
                await signInWithEmailAndPassword(auth, result.email, result.password);
                setLoading(false);
                handlePromise();
            }
        } catch (error) {
            handleError(error);
            setIsError(true);
            setLoading(false);
        }
    }


    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {(formikProps) => {
                const { resetForm } = formikProps;
                const handleToggleForm = () => {
                    setIsRegister(!isRegister);
                    resetForm();
                    setIsError(false);
                }
                return (
                    <Form>
                        <div className={cx('wrapper')} >
                            <div ref={modalRef} className={cx('inner')}>
                                <div className={cx('form')}>
                                    <h2 className={cx('form-heading')}>{!isRegister ? 'Đăng nhập' : 'Đăng ký'}</h2>
                                    {isError && (<div className={cx('error')}>
                                        <RiErrorWarningFill className={cx('error-icon')} />
                                        <span className={cx('error-message')}>{errValue}</span>
                                    </div>)}
                                    {isRegister && (
                                        <FastField
                                            name='name'
                                            component={InputField}
                                            type='text'
                                            placeholder='Tên người dùng'
                                        />
                                    )}
                                    <FastField
                                        name='email'
                                        component={InputField}
                                        type='email'
                                        placeholder='Email'
                                    />
                                    <FastField
                                        name='password'
                                        component={InputField}
                                        type='password'
                                        placeholder='Mật khẩu'
                                    />
                                    {isRegister && (<FastField
                                        name='confirmPassword'
                                        component={InputField}
                                        type='password'
                                        placeholder='Nhập lại mật khẩu'
                                    />)}
                                    <button className={cx('btn-submit')} type="submit">
                                        {!isRegister ? 'Đăng nhập' : 'Đăng ký'}
                                    </button>
                                    <span className={cx('other-login-text')}>
                                        {!isRegister ? 'Hoặc đăng nhập với' : 'Hoặc đăng ký với'}
                                    </span>
                                    <div className={cx('socials')}>
                                        <div className={cx('social-fb')} onClick={handleSignInFacebook}>
                                            <BsFacebook className={cx('icon')} />
                                            <span className={cx('text')}>Facebook</span>
                                        </div>
                                        <div className={cx('social-gg')} onClick={handleSignInGoolge}>
                                            <FcGoogle className={cx('icon')} />
                                            <span className={cx('text')}>Google</span>
                                        </div>
                                    </div>
                                    <div className={cx('not-account')}>
                                        {!isRegister ? 'Không có tài khoản? ' : 'Đã có tài khoản '}
                                        <span
                                            className={cx('toggle-form-btn')}
                                            onClick={handleToggleForm}
                                        >
                                            {!isRegister ? 'Đăng ký ngay' : 'Đăng nhập'}
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('close')} onClick={handleClose}>
                                    <AiFillCloseCircle />
                                </div>
                            </div>
                            {isMessageSuccer && <MessageSuccer />}
                            {loading && <LoadingIcon />}
                        </ div>
                    </Form>
                )
            }
            }
        </Formik >

    )
}
export default FormLogin;