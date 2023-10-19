import {
    ADD_PRODUCT,
    REMOVE_PRODUCT,
    INCREASE,
    DECREASE,
    ADD_CART
} from "./constants";

export const numberWithCommas = (value) => {
    return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const initState = JSON.parse(localStorage.getItem('cart'));

function reducer(state, action) {

    let newCartItems;
    let newCartLength;
    let newTotalPrice;

    switch (action.type) {
        case ADD_PRODUCT:
            const productItem = action.payload;
            const productItemDuplicate = state?.cartItems?.find(item => item.name === productItem.name);

            if (productItemDuplicate) {

                const newProducts = state.cartItems.filter(item => item.name !== productItem.name);
                const totalPriceDuplicate = productItem.totalPrice + productItemDuplicate.totalPrice;

                newCartItems = [...newProducts, {
                    ...productItem,
                    quantity: productItem.quantity + productItemDuplicate.quantity,
                    totalPrice: totalPriceDuplicate
                }]
            } else {
                newCartItems = [...state.cartItems, productItem];
            }

            newCartLength = newCartItems.reduce((total, item) => total += item.quantity, 0);
            newTotalPrice = newCartItems.reduce((total, item) => {
                const priceItems = item.totalPrice;
                total += priceItems;
                return total;
            }, 0)

            state = {
                ...state,
                cartItems: newCartItems,
                cartLength: newCartLength,
                totalPrice: numberWithCommas(newTotalPrice)
            }

            localStorage.setItem('cart', JSON.stringify(state));
            return state;

        case REMOVE_PRODUCT:
            const indexItem = action.payload;
            newCartItems = [...state.cartItems];
            newCartItems.splice(indexItem, 1);
            newCartLength = newCartItems.reduce((total, item) => total += item.quantity, 0)
            newTotalPrice = newCartItems.reduce((total, item) => {
                const priceItems = item.totalPrice;
                total += priceItems
                return total;
            }, 0)
            state = {
                ...state,
                cartItems: [...newCartItems],
                cartLength: newCartLength,
                totalPrice: newCartLength !== 0 ? numberWithCommas(newTotalPrice) : 0
            }

            localStorage.setItem('cart', JSON.stringify(state));
            return state;

        case INCREASE:
            newCartLength = state.cartItems.reduce((total, item, index) => {
                const indexProductItem = action.payload;
                if (index === indexProductItem) {
                    item.quantity += 1;
                    item.totalPrice = item.quantity * item.price;
                }
                total += item.quantity
                return total;
            }, 0)

            newTotalPrice = state.cartItems.reduce((total, item) => {
                const priceItems = item.totalPrice;
                total += priceItems;
                return total;
            }, 0)

            state = {
                ...state,
                cartLength: newCartLength,
                totalPrice: numberWithCommas(newTotalPrice)
            }

            localStorage.setItem('cart', JSON.stringify(state));
            return state;

        case DECREASE:
            newCartLength = state.cartItems.reduce((total, item, index) => {
                const indexProductItem = action.payload;
                if (index === indexProductItem) {
                    if (item.quantity > 1) {
                        item.quantity -= 1;
                        item.totalPrice = item.quantity * item.price;
                    }
                }
                total += item.quantity;
                return total;
            }, 0)

            newTotalPrice = state.cartItems.reduce((total, item) => {
                const priceItems = item.totalPrice;
                total += priceItems;
                return total;
            }, 0)

            state = {
                ...state,
                cartLength: newCartLength,
                totalPrice: numberWithCommas(newTotalPrice),
            }

            localStorage.setItem('cart', JSON.stringify(state));
            return state;

        case ADD_CART:
            const data = action.payload;
            state = { ...state, ...data };
            localStorage.setItem('cart', JSON.stringify(state))
            return state;

        default:
            return state;
    }
}
export default reducer;