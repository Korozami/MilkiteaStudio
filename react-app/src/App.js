import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import HomePage from "./components/HomePage";
import StorePage from "./components/StorePage";
import UserPage from "./components/UserPage";
import AddressPage from "./components/AddressPage";
import ProductDetail from "./components/ProductDetailPage";
import AddressForm from "./components/AddressAddPage";
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
          <Route path="/store/products/:productId">
            <ProductDetail />
          </Route>
          <Route path="/user/portfolio">
            <UserPage />
          </Route>
          <Route path="/address/add">
            <AddressForm />
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
