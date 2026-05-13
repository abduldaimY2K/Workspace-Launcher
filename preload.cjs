const { contextBridge, ipcRenderer } = require("electron");


contextBridge.exposeInMainWorld("electronAPI", {
  
  getApps: () => ipcRenderer.invoke("get-installed-apps"),

  launchApp: (appPath) => ipcRenderer.invoke("launch-app", appPath),

});