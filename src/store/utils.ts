import React from "react";
import { observer } from "mobx-react-lite";

export function applyStoreProvider(component: React.FC) {
  return observer(component);
}