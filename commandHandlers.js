function handleExit() {
    console.log(arguments.callee.name);
    process.exit(0);
}
function handleShow(input) {
    console.log(arguments.callee.name);
}
function handleImportant(input) {
    console.log(arguments.callee.name);
}
function handleUser(input) {
    console.log(arguments.callee.name);
}
function handleSort(input) {
    console.log(arguments.callee.name);
}
function handleDate(input) {
    console.log(arguments.callee.name);
}
function handleHelp(input) {
    console.log(arguments.callee.name);
}

module.exports = {
    handleExit,
    handleShow,
    handleImportant,
    handleUser,
    handleSort,
    handleDate,
    handleHelp
};
// TODO you can do it!
