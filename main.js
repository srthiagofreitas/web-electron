const { app, BrowserWindow, globalShortcut } = require("electron");

let win;

function createWindow() {
  // Cria uma janela de navegação.
  //const win = new BrowserWindow({
  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: "hidden", // para não mostrar a titulo na barra do app
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // e carregue o index.html do aplicativo.
  win.loadFile("index.html");
  //para abrir uma url especifica
  //win.loadURL("http://www.uol.com.br");

  // Open the DevTools.
  // win.webContents.openDevTools();
}

// função para abrir o devtools no f12
function toggleDevTools() {
  win.webContents.toggleDevTools();
}

// função para criar atalhos
function createShortcuts() {
  globalShortcut.register("CmdOrCtrl+J", toggleDevTools);
}

// Este método será chamado quando o elétron terminar
// inicialização e está pronto para criar janelas do navegador.
// Algumas APIs podem ser usadas somente depois que esse evento ocorre.
app.whenReady().then(createWindow).then(createShortcuts);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // No macOS é comum para aplicativos e sua barra de menu
  // permaneçam ativo até que o usuário explicitamente encerre com Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. Você também pode colocar eles em arquivos separados e requeridos-as aqui.
