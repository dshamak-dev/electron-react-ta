const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

const EVENTS = {
  MOVE_SLIDE: 'move-slide',
  LOAD_MORE: 'load-more'
};

module.exports.EVENTS = EVENTS;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    x: 0,
    y: 0,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
    },
  });

  mainWindow.loadFile(path.join(__dirname, "dist/index.html"));

  ipcMain.on(EVENTS.MOVE_SLIDE, (event, direction) => {
    mainWindow?.webContents.send(EVENTS.MOVE_SLIDE, direction);
  });

  ipcMain.on(EVENTS.LOAD_MORE, (event) => {
    mainWindow?.webContents.send(EVENTS.LOAD_MORE);
  });

  mainWindow.on("close", () => app.quit());

  createSecondWindow("controls.html", { x: 800, y: 0 });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});

function createSecondWindow(file, props) {
  let win = new BrowserWindow({
    width: 460,
    height: 320,
    ...props,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
    },
  });

  win.on("close", () => {
    win = null;
  });

  const filePath = path.join(__dirname, `dist/${file}`);

  win.loadFile(filePath);
  win.show();
}
