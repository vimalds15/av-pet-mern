import {configureStore} from "@reduxjs/toolkit"
import CartSlice from "./cart/CartSlice"
import OrderCreateSlice from "./order/OrderCreateSlice"
import OrderDetailSlice from "./order/OrderDetailSlice"
import OrderListSlice from "./order/OrderListSlice"
import OrderPaySlice from "./order/OrderPaySlice"
import ProductDetailSlice from "./products/ProductDetailSlice"
import ProductSlice from "./products/ProductSlice"
import UserListSlice from "./user/UserListSlice"
import UserLoginSlice from "./user/UserLoginSlice"
import UserProfileSlice from "./user/UserProfileSlice"
import UserRegisterSlice from "./user/UserRegisterSlice"

export const store = configureStore({
    reducer:{
        "product":ProductSlice,
        "productDetail":ProductDetailSlice,
        "cart":CartSlice,
        "userLogin":UserLoginSlice,
        "userRegister":UserRegisterSlice,
        "userProfile":UserProfileSlice,
        "userList":UserListSlice,
        "orderCreate":OrderCreateSlice,
        "orderDetail":OrderDetailSlice,
        "orderPay":OrderPaySlice,
        "orderList":OrderListSlice,

    }
})