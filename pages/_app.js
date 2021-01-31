import App from 'next/app';
import withRedux, { createWrapper } from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import store from '../store'

import '../styles/globals.css';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);
