import { StrictMode } from "react";
import ReactDOM from "react-dom";

import { Main } from "./Main";

import "./styles.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Main />
  </StrictMode>,
  rootElement
);
