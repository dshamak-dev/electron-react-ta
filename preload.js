const { contextBridge, ipcRenderer } = require("electron");

const exposedAPI = {
  addEventListener: (key, callback) => ipcRenderer.on(key, callback),
  moveSlide: (direction) => {
    ipcRenderer.send("move-slide", String(direction));
  },
  loadMore: () => {
    ipcRenderer.send("load-more");
  },
};

contextBridge.exposeInMainWorld("electron", exposedAPI);
