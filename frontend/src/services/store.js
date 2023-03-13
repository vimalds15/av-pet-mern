import {configureStore} from "@reduxjs/toolkit"
import CartSlice from "./cart/CartSlice"
import OrderCreateSlice from "./order/OrderCreateSlice"
import ProductDetailSlice from "./products/ProductDetailSlice"
import ProductSlice from "./products/ProductSlice"
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
        "orderCreate":OrderCreateSlice
    }
})