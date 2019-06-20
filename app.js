const {app, BrowserWindow} = require('electron')

let win;

function makeWindow() {
    win = new BrowserWindow({
        width: 1920, 
        height: 1080, 
        webPreferences: {
            nodeIntegration: true
        },
        icon: __dirname + '/icon.png',
        
    })

    win.setMenu(null)

    win.loadFile("app/index.html")

    win.on('closed', () => {
        win = null
    })

    win.maximize();
}

app.on('ready', makeWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit()
})

app.on('activate', () => {
    if (win === null)
        makeWindow()
})

