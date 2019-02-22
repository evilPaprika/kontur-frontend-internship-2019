const { readLine } = require('./console');
const commentsParser = require('./commentsParser');
const { handlerSwitch } = require('./commandHandlers');

const parsedComments = commentsParser.getParsedFromFolder(process.cwd());

app();

function app() {
    console.log('Please, write your command!');
    readLine(processCommand);
}

function processCommand(command) {
    const [commandName, arguments] = command.split(/ (.*)/);
    if (handlerSwitch.hasOwnProperty(commandName)) {
        handlerSwitch[commandName](parsedComments, arguments);
    } else {
        console.log('wrong command');
    }
}
