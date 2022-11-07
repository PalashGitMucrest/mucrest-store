import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";

window.testPGH = () => {
  console.log('drive fetched');
}
window.renderDrive = (containerId, data) => {

  ReactDOM.render(
    <>
      <React.StrictMode>
        <App {...data} />
      </React.StrictMode>
    </>,
    document.getElementById(containerId)
  );
}


window.unmountHeader = containerId => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>
);
reportWebVitals();
