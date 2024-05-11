import { createElement } from "react";
import { App } from "src/components/app";
import "./style.css";

import { createRoot } from "react-dom/client";

const rootEl = document.getElementById("root");

const root = createRoot(rootEl || document.body);
root.render(createElement(App));
