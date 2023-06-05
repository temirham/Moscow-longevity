import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import 'macro-css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

/* The following line can be included in your src/index.js or App.js file */
import store, {persistor} from "./store";
import { Provider } from "react-redux";
import {PersistGate} from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
    document.getElementById('root')
);



root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading = {null} persistor = {persistor}>
            <App />
           </PersistGate>
        </Provider>
    </React.StrictMode>
);

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

