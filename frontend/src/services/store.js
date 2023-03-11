import {configureStore} from "@reduxjs/toolkit"
import ProductSlice from "./products/ProductSlice"

export const store = configureStore({
    reducer:{
        "product":ProductSlice
    }
})