import {configureStore} from "@reduxjs/toolkit"
import CartSlice from "./cart/CartSlice"
import OrderCreateSlice from "./order/OrderCreateSlice"
import OrderDeliverSlice from "./order/OrderDeliverSlice"
import OrderDetailSlice from "./order/OrderDetailSlice"
import OrderListAdminSlice from "./order/OrderListAdminSlice"
import OrderListSlice from "./order/OrderListSlice"
import OrderPaySlice from "./order/OrderPaySlice"
import ProductCreateReviewSlice from "./products/ProductCreateReviewSlice"
import ProductCreateSlice from "./products/ProductCreateSlice"
import ProductDeleteSlice from "./products/ProductDeleteSlice"
import ProductDetailSlice from "./products/ProductDetailSlice"
import ProductSlice from "./products/ProductSlice"
import ProductTopSlice from "./products/ProductTopSlice"
import ProductUpdateSlice from "./products/ProductUpdateSlice"
import UserDeleteSlice from "./user/UserDeleteSlice"
import UserDetailSlice from "./user/UserDetailSlice"
import UserListSlice from "./user/UserListSlice"
import UserLoginSlice from "./user/UserLoginSlice"
import UserProfileSlice from "./user/UserProfileSlice"
import UserRegisterSlice from "./user/UserRegisterSlice"
import UserUpdateSlice from "./user/UserUpdateSlice"

export const store = configureStore({
    reducer:{
        "product":ProductSlice,
        "productDetail":ProductDetailSlice,
        "productDelete":ProductDeleteSlice,
        "productCreate":ProductCreateSlice,
        "productUpdate":ProductUpdateSlice,
        "productTop":ProductTopSlice,
        "productCreateReview":ProductCreateReviewSlice,
        "cart":CartSlice,
        "userLogin":UserLoginSlice,
        "userRegister":UserRegisterSlice,
        "userProfile":UserProfileSlice,
        "userList":UserListSlice,
        "userUpdate":UserUpdateSlice,
        "userDetail":UserDetailSlice,
        "userDelete":UserDeleteSlice,
        "orderCreate":OrderCreateSlice,
        "orderDetail":OrderDetailSlice,
        "orderPay":OrderPaySlice,
        "orderList":OrderListSlice,
        "orderListAdmin":OrderListAdminSlice,
        "orderDeliver":OrderDeliverSlice,
    }
})