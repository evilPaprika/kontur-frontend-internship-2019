const { getAllFilePathsWithExtension, readFile } = require('./fileSystem');
const { readLine } = require('./console');
const commentsParser = require('./commentsParser');
const commandHandlers = require('./commandHandlers');

const handlerSwitch = {
    exit: commandHandlers.handleExit,
    show: commandHandlers.handleShow,
    important: commandHandlers.handleImportant,
    user: commandHandlers.handleUser,
    sort: commandHandlers.handleSort,
    date: commandHandlers.handleDate,
    help: commandHandlers.handleHelp
};

const parsedComments = commentsParser.getParsed(getFiles());

app();

function app() {
    console.log(parsedComments);
    console.log('Please, write your command!');
    readLine(processCommand);
}

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
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

// TODO you can do it!
