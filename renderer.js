const { dialog } = require('electron').remote;
const {remote}  = require('electron');
const fs = require('fs');
const os = require('os');


let mainTextArea = document.getElementById("main-text-area");
let fileName     = document.getElementById('file-name');

let platform = os.platform();
let selectedPath;
let option = {
    defaultPath: '/home/cliff',
    properties: ['openFile'],
    title: 'Select a file'
    }

function openFile(){

    selectedPath = dialog.showOpenDialogSync(null ,option);
    console.log(`this is the ${selectedPath}`);
    if(selectedPath == undefined){
       console.log('nada foi selecionado')
    }
    else{
        filePath = fs.readFileSync(String(selectedPath), {encoding: 'utf-8'})
        fileName.value = get_music_name(String(selectedPath));
        mainTextArea.value = filePath;
    }
}

function saveIn(){
    let optionPath = {
        defaultPath: '/home/cliff',
        properties: ['openDirectory'],
        title: 'Select a directory',
        }
    selectedPath = dialog.showOpenDialogSync(null ,optionPath);


        if(selectedPath == undefined){
            console.log("Cancel");
        }
        else{
        let result = String(selectedPath) + `/${fileName.value}`;
        selectedPath = String(selectedPath) + `/${fileName.value}`;
        console.log(result);
        save = fs.writeFileSync(result, mainTextArea.value);
        }
}

function saveFile(){
    let result;
    let optionPath = {
        defaultPath: '/home/cliff',
        properties: ['openDirectory'],
        title: 'Select a directory',
        }

    if(selectedPath == undefined){
        selectedPath = dialog.showOpenDialogSync(null ,optionPath);
        if(selectedPath == undefined){
            console.log("Cancel");
        }
        else{
         result = String(selectedPath) + `/${fileName.value}`;
         selectedPath = result;
        console.log(result);
        save = fs.writeFileSync(result, mainTextArea.value);
        }
     }
     else{
        result = String(selectedPath)
        console.log(result);
        save = fs.writeFileSync(result, mainTextArea.value);
     }
}

function setUpper(){
    let start = mainTextArea.selectionStart;
    let finish = mainTextArea.selectionEnd;
    let result = mainTextArea.value.substring(start, finish);
    mainTextArea.value = mainTextArea.value.replace(result, result.toUpperCase());
}

function setLower(){
    let start = mainTextArea.selectionStart;
    let finish = mainTextArea.selectionEnd;
    let result = mainTextArea.value.substring(start, finish);
    mainTextArea.value = mainTextArea.value.replace(result, result.toLowerCase());
}

function getSelText()
{
    var start = mainTextArea.selectionStart;
    var finish = mainTextArea.selectionEnd;
    var sel = mainTextArea.value.substring(start, finish);
    return sel;
}

function get_music_name(path_name){
    console.log(platform)
    if(platform == 'linux'){
      path_name	= path_name.replace('/\/g', "/");
      let arch_name = path_name.substring(path_name.lastIndexOf('/') + 1);
      let exten= arch_name.substring(arch_name.lastIndexOf('.') + 1);
      return arch_name;
    }
    if(platform == 'win32'){
      path_name = path_name.match(/[^\\]+$/)
      return path_name
    }
    else{
      window.alert('Your system dont suport this application')
    }
  
  }

function miniMize(){
    remote.BrowserWindow.getFocusedWindow().minimize();
}

function maxMize(){
    let window = remote.BrowserWindow.getFocusedWindow();
    window.isMaximized() ? window.unmaximize() : window.maximize();
}

function exitApp(){
    window.close();
}