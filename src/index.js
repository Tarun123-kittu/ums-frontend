import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from './Components/Utils/appContecxt';
import appStore from './utils/redux/appStore';
import { Provider } from 'react-redux';
import { ToastContainer } from "react-toastify";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={appStore}>
    <AppProvider>
      <App />
    </AppProvider>
  </Provider>
);
reportWebVitals();
