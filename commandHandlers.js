const { printTable } = require('./tableMaker');
const sortMethods = require('./sortMethods');

function handleExit() {
    process.exit(0);
}

function handleShow(comments) {
    printTable(comments);
}

function handleImportant(comments) {
    printTable(comments.filter(({ importance }) => Boolean(importance)));
}

function handleUser(comments, username) {
    if (!username) {
        console.log('Please, specify username like this: user {username}');
        return;
    }

    printTable(
        comments.filter(
            ({ user }) => user.toUpperCase() === username.toUpperCase()
        )
    );
}

function handleSort(comments, sortField) {
    if (!sortField) {
        console.log(
            'Please, specify sort method like this: sort {importance | user | date}'
        );
        return;
    }

    printTable(
        comments.sort((comment_1, comment_2) =>
            sortMethods[sortField](comment_1, comment_2)
        )
    );
}

function handleDate(comments, date) {
    if (!date) {
        console.log('Please, specify date like this: date {yyyy[-mm-dd]}');
        return;
    }

    printTable(comments.filter(comment => comment.date >= date));
}

const handlerSwitch = {
    exit: handleExit,
    show: handleShow,
    important: handleImportant,
    user: handleUser,
    sort: handleSort,
    date: handleDate
};

module.exports = {
    handlerSwitch
};
