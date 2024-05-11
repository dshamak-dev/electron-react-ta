import React from "react";
import { store } from "src/store";
import { applyStoreProvider } from "src/store/utils";

export const CatalogControls = applyStoreProvider(() => {
  const { loading } = store.state;

  const handleNext = () => {
    store.next();
  };

  const handlePrev = () => {
    store.previous();
  };

  const handleLoadMore = () => {
    store.loadNext();
  };

  if (loading) {
    return null;
  }

  return (
    <>
      <button className="catalog-button previous" onClick={handlePrev}></button>
      <button className="catalog-button next" onClick={handleNext}></button>
      <button className="catalog-button more" onClick={handleLoadMore}></button>
    </>
  );
});
