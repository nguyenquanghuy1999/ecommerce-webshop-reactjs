import { ModalContext } from "../providers/Modal";
import { useNavigate } from "react-router-dom";

import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Search from "../pages/Search";
import Category from "../pages/Category/Category";
import config from "../config";
import LayoutNotSlider from '../layouts/LayoutNotSlider';
import NotFound from "../pages/NotFound";
import { useContext, useEffect } from "react";


export const ProtectedRoute = ({ children }) => {

    const currentUser = JSON.parse(localStorage.getItem('user'));
    const { modalOpen } = useContext(ModalContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
            modalOpen();
        }
    }, [])

    return <>{children}</>
}

export const routes = [
    { path: config.home, component: Home },
    { path: config. search, component: Search, layout: LayoutNotSlider },
    { path: config.productSearch, component: ProductDetail, layout: LayoutNotSlider },
    { path: config.productDetail, component: ProductDetail, layout: LayoutNotSlider },
    { path: config.cart, component: Cart, layout: LayoutNotSlider, protected: ProtectedRoute },
    { path: config.category, component: Category, layout: LayoutNotSlider },
    { path: config.notFound, component: NotFound, layout: LayoutNotSlider },
]


