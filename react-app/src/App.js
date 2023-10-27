import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import HomePage from "./components/HomePage";
import StorePage from "./components/StorePage";
import UpdateAddressForm from "./components/UpdateAddressPage";
import UpdatePaymentForm from "./components/UpdatePaymentPage";
import UserPage from "./components/UserPage";
import CartPage from "./components/CartPage";
import UpdateProductForm from "./components/UpdateProductPage";
import ProductForm from "./components/ProductAddPage";
import AdminPage from "./components/AdminPage";
import PaymentPage from "./components/PaymentPage";
import AddressPage from "./components/AddressPage";
import ProductDetail from "./components/ProductDetailPage";
import AddressForm from "./components/AddressAddPage";
import AboutPage from "./components/AboutPage";
import PaymentForm from "./components/PaymentAddPage";
import AdminProductPage from "./components/AdminProductPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/store/products/:productId/update">
            <UpdateProductForm />
          </Route>
          <Route path="/store/products/:productId">
            <ProductDetail />
          </Route>
          <Route path="/user/portfolio">
            <UserPage />
          </Route>
          <Route path="/address/add">
            <AddressForm />
          </Route>
          <Route path="/address/:addressId/update">
            <UpdateAddressForm />
          </Route>
          <Route path="/admin/products/add">
            <ProductForm />
          </Route>
          <Route path="/payment/add">
            <PaymentForm />
          </Route>
          <Route path="/payment/:paymentId/update">
            <UpdatePaymentForm />
          </Route>
          <Route path="/cart">
            <CartPage />
          </Route>
          <Route path="/payment">
            <PaymentPage />
          </Route>
          <Route path="/admin/products">
            <AdminProductPage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/admin">
            <AdminPage />
          </Route>
          <Route path="/address">
            <AddressPage />
          </Route>
          <Route path="/store">
            <StorePage />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
