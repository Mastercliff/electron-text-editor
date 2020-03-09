const electron = require('electron');
const {app, BrowserWindow, Menu} = require('electron');


function createWindow(){

   let mainWin = new BrowserWindow({
       width: 800,
       height: 600,
       frame: false,
       webPreferences: {
        nodeIntegration: true
       }
   })
 mainWin.loadFile('index.html');
}

//Menu.setApplicationMenu(false);
app.on('ready', createWindow);