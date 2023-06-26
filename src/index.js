import React from "react";
import ReactDOM from 'react-dom';
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import { Provider } from "react-redux";

import store from "./store";

ReactDOM.hydrate(<Provider store={store}>
  <React.Fragment>
    <BrowserRouter basename={'/admin'}>
      <App />
    </BrowserRouter>
  </React.Fragment>
</Provider>, document.getElementById("root"));

serviceWorker.unregister()
