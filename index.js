const { getAllFilePathsWithExtension, readFile } = require('./fileSystem');
const { readLine } = require('./console');
const {
    handleExit,
    handleShow,
    handleImportant,
    handleUser,
    handleSort,
    handleDate,
    handleHelp
} = require('./commandHandlers');

const handlerSwitch = {
    exit: handleExit,
    show: handleShow,
    important: handleImportant,
    user: handleUser,
    sort: handleSort,
    date: handleDate,
    help: handleHelp
};

const parsedComments = [];

app();

function app() {
    const files = getFiles();
    parseComments(files);
    console.log('Please, write your command!');
    readLine(processCommand);
}

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    console.log(filePaths);
    return filePaths.map(path => readFile(path));
}

function processCommand(command) {
    const [commandName, arguments] = command.split(/ (.*)/);
    if (handlerSwitch.hasOwnProperty(commandName)) {
        console.log(handlerSwitch[commandName](arguments.trim()));
    } else {
        console.log('wrong command, type help to list available commands');
    }
}

function parseComments() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    for (const path of filePaths) {
        const file = readFile(path);
        const comments = /^(?:[^"]|"[^"]*")*?(\/\/ TODO.*)/gim.exec(file);
        console.log(comments);
    }
}
// TODO you can do it!
