import React, { useEffect, useMemo } from "react";
import { store } from "src/store";
import { applyStoreProvider } from "src/store/utils";
import { Preview, Controls } from "src/components/catalog";

declare global {
  interface Window {
    electron: {
      addEventListener: (
        eventName: string,
        callback: (event, message: string) => void
      ) => void;
    };
  }
}

const MEDIA_LIMIT = 10;

export const App = applyStoreProvider(() => {
  useEffect(() => {
    store.loadNext(MEDIA_LIMIT);

    if (window.electron?.addEventListener) {
      window.electron.addEventListener("move-slide", (event, message) => {
        const direction = Number(message);

        store.move(direction);
      });

      window.electron.addEventListener("load-more", (event, message) => {
        store.loadNext(MEDIA_LIMIT);
      });
    }
  }, []);

  const showControls = useMemo(() => {
    return !window.electron;
  }, []);

  return (
    <div>
      {showControls ? <Controls /> : null}
      <Preview />
    </div>
  );
});
