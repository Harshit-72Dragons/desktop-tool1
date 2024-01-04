
const { app, BrowserWindow, autoUpdater } = require('electron')
function checkForUpdates() {
  autoUpdater.checkForUpdatesAndNotify();
}
function createWindow() {
  //to Create the browser window
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  //to Load  HTML file
  win.loadFile('new.html')
}

app.whenReady().then(() => {
  checkForUpdates();

  app.on('activate', () => {
    // On macOS, it's common to re-create a window even after all windows have been closed.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

autoUpdater.on('update-available', () => {
  // Handle update available
});

autoUpdater.on('update-not-available', () => {
  // Handle no update available
});

autoUpdater.on('update-downloaded', () => {
  // Prompt the user to restart the app to apply the update
  autoUpdater.quitAndInstall();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})