import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './components/GlobalStyles';
import { default as ModalProvider } from './providers/Modal';
import { Provider as StoreProvider } from 'react-redux';
import AuthUser from './providers/AuthUser';
import store from './store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalStyles>
    <StoreProvider store={store}>
      <AuthUser>
        <ModalProvider>
          <App />
        </ModalProvider>
      </AuthUser>
    </StoreProvider>
  </GlobalStyles>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
