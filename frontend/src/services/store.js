import {configureStore} from "@reduxjs/toolkit"
import CartSlice from "./cart/CartSlice"
import ProductSlice from "./products/ProductSlice"

export const store = configureStore({
    reducer:{
        "product":ProductSlice,
        "cart":CartSlice
    }
})