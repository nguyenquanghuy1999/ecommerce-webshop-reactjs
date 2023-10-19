import {
    ADD_PRODUCT,
    REMOVE_PRODUCT,
    INCREASE,
    DECREASE,
    RENDER_CART_LIST,
    REMOVE_CART,
    ADD_CART
} from "./constants";

const addProductToCart = payload => ({ type: ADD_PRODUCT, payload });

const removeProduct = payload => ({ type: REMOVE_PRODUCT, payload });

const addCart = payload => ({ type: ADD_CART, payload });

const increase = payload => ({ type: INCREASE, payload });

const decrease = payload => ({ type: DECREASE, payload });

const renderCartList = () => ({ type: RENDER_CART_LIST });

const removeCart = () => ({ type: REMOVE_CART });

export {
    addProductToCart,
    removeProduct,
    increase,
    decrease,
    renderCartList,
    removeCart,
    addCart
};

