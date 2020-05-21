import React from "react";
import ReactDOM from "react-dom";
import AppShell from "./AppShell";
import * as serviceWorker from "./serviceWorker";
import "./styles/index.css";
import "./styles/common/common.css";
import "./styles/common/buttons.css";
import "./styles/common/common-forms.css";

import 'bootstrap/dist/css/bootstrap.min.css';

import "./styles/scrollbars.css";

ReactDOM.render(
  <AppShell />,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
