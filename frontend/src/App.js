import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";

import {
  HomeScreen,
  ProductScreen,
  CartScreen,
  LoginScreen,
  RegisterScreen,
  ProfileScreen,
  ShippingScreen,
  PaymentScreen,
  OrderScreen,
  PlaceOrderScreen,
  UserListScreen,
  UserEditScreen,
  ProductEditScreen,
  ProductListScreen,
  OrderListScreen,
} from "./pages";

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/page/:pageNumber" element={<HomeScreen />} />
            <Route path="/search/:keyword/" element={<HomeScreen />} />
            <Route
              path="/search/:keyword/page/:pageNumber"
              element={<HomeScreen />}
            />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/:id?" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/orders/:id" element={<OrderScreen />} />
            <Route path="/admin/userlist" element={<UserListScreen />} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
            <Route path="/admin/productlist" element={<ProductListScreen />} />
            <Route
              path="/admin/productlist/:pageNumber"
              element={<ProductListScreen />}
            />
            <Route
              path="/admin/product/:id/edit"
              element={<ProductEditScreen />}
            />
            <Route path="/admin/orderlist" element={<OrderListScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
