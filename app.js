const electron = require("electron");
const url = require("url");
const path = require("path");
const {
    app,
    BrowserWindow,
    Menu
} = electron;

let mainWindow;
let addWindow;

app.on("ready", function () {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "index.html"),
            protocol: "file:",
            slashes: true,
        })
    );
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

// mainWindow.on('close', function () {
//   app.quit();
// });

function createAddWindow() {
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: "Add Todo List Item",
    });
    addWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "addWindow.html"),
            protocol: "file:",
            slashes: true,
        }));
    addWindow.on('close', function () {
        addWindow == null
    })
}

const mainMenuTemplate = [{
    label: "File",
    submenu: [{
            label: "Add Item",
            click() {
                createAddWindow();
            },
        },
        {
            label: "Clear Items",
        },
        {
            label: "Exit",
            accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
            click() {
                app.quit();
            },
        },
    ],
},
];

if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
      label: "Developer Tools",
      submenu: [
        {
          label: "Toggle DevTools",
          accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl+I",
          click(item, focusedWindow) {
            focusedWindow.toggleDevTools();
          },
        },
        {
            role: 'reload'
        },
      ],
    });
}
