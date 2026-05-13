import { app, BrowserWindow, shell, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


function getStartMenuApps() {
  const paths = [
    "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs",
  ];

  let apps = [];

  for (const p of paths) {
    try {
      const files = fs.readdirSync(p, { withFileTypes: true });
      console.log("files are", files[0]);
      files.forEach((file) => {
        if (file.name.endsWith(".lnk")) {
          apps.push({
            title: path.basename(file.name, ".lnk"),
            path: path.join(p, file.name),
          });
        }
      });
    } catch (err) {
      console.log("Failed reading:", p);
    }
  }

  // sort alphabetically
  apps.sort((a, b) => a.title.localeCompare(b.title));

  return apps;
}

ipcMain.handle("get-installed-apps", async () => {
  return getStartMenuApps();
});

ipcMain.handle("launch-app", async (_, appPath) => {
  alert(Launched)
  // try {
  //   await shell.openPath(appPath);
  //   return true;
  // } catch (err) {
  //   console.log("Launch failed:", err);
  //   return false;
  // }
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.setMenu(null);
  win.webContents.openDevTools();
  win.loadURL("http://localhost:5173");
}

app.whenReady().then(createWindow);
