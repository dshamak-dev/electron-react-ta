import React, { useMemo } from "react";
import { store } from "src/store";
import { applyStoreProvider } from "src/store/utils";

export const CatalogPreview = applyStoreProvider(() => {
  const { current, count, number, loading } = store.state;

  const content = useMemo(() => {
    if (loading) {
      return <strong>loading media</strong>;
    }

    if (!current) {
      return <p>no media found</p>;
    }

    return (
      <>
        <div className="image-wrap">
          <img
            key={current.id}
            src={current.url}
            style={{ maxWidth: "100%", maxHeight: "90vh" }}
          />
        </div>
        <div className="slide-info">{number} / {count}</div>
      </>
    );
  }, [current, loading, count, number]);

  return <div className="preview-container">{content}</div>;
});
