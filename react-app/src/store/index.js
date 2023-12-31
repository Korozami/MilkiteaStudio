import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import productReducer from './product';
import addressReducer from './address';
import paymentReducer from './payment';
import orderReducer from './order';
import cartReducer from './cart';
import imageReducer from './productImage';
import userReducer from './user';

const rootReducer = combineReducers({
  session,
  users: userReducer,
  products: productReducer,
  addresses: addressReducer,
  payments: paymentReducer,
  carts: cartReducer,
  orders: orderReducer,
  images: imageReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
