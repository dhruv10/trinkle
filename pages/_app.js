import App, {Container} from "next/app";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import withRedux from "next-redux-wrapper";

import '../styles/globals.css';

const reducer = (state = {foo: ''}, action) => {
  switch (action.type) {
      case 'FOO':
          return {...state, foo: action.payload};
      default:
          return state
  }
};

const makeStore = (initialState, options) => {
  return createStore(reducer, initialState);
};

function MyApp({ Component, pageProps }) {
  

  return <Component {...pageProps} />;
}

export default MyApp;
