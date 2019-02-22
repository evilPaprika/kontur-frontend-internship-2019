const sortMethods = require('./sortMethods');

function handleExit() {
    process.exit(0);
}

function handleShow(comments) {
    printTable(comments);
}

function handleImportant(comments) {
    printTable(comments.filter(comment => Boolean(comment.importance)));
}

function handleUser(comments, username) {
    if (!username) {
        console.log('Please, specify username like this: user {username}');
        return;
    }
    printTable(
        comments.filter(
            comment => comment.user.toUpperCase() === username.toUpperCase()
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

function printTable(comments) {
    const intervals = findOutColumnsIntervals(comments);
    console.log(
        tableLine(1, 'user', 'date', 'comment', 'fileName', intervals) +
            dashLine(intervals) +
            comments
                .map(({ importance, user, date, comment, fileName }) =>
                    tableLine(
                        importance,
                        user,
                        date,
                        comment,
                        fileName,
                        intervals
                    )
                )
                .join('') +
            dashLine(intervals)
    );
}

function tableLine(important, user, date, comment, fileName, intervals) {
    return `  ${important ? '!' : ' '}  \
|  ${chopAndPad(user, intervals.user)}  \
|  ${chopAndPad(date, intervals.date)}  \
|  ${chopAndPad(comment, intervals.comment)}  \
|  ${chopAndPad(fileName, intervals.fileName)}  \n`;
}

function dashLine(intervals) {
    return (
        '-'.repeat(Object.values(intervals).reduce((sum, a) => sum + a) + 24) +
        '\n'
    );
}

/**
 * обрезать строку если она слишком длинная, и
 * добавить пробелы под заданый интервал
 * @param {string} str
 * @param {int} interval
 */
function chopAndPad(str, maxLength) {
    if (str.length > maxLength) {
        str = str.substring(0, maxLength - 3) + '...';
    }

    return str.padEnd(maxLength, ' ');
}

function findOutColumnsIntervals(comments) {
    const intervals = {
        important: 1,
        user: 4,
        date: 4,
        comment: 7,
        fileName: 8
    };

    for (const comment of comments) {
        intervals.user = Math.max(intervals.user, comment.user.length);
        intervals.date = Math.max(intervals.date, comment.date.length);
        intervals.comment = Math.max(intervals.comment, comment.comment.length);
        intervals.fileName = Math.max(
            intervals.fileName,
            comment.fileName.length
        );
    }

    intervals.user = Math.min(intervals.user, 10);
    intervals.date = Math.min(intervals.date, 10);
    intervals.comment = Math.min(intervals.comment, 50);
    intervals.fileName = Math.min(intervals.fileName, 15);

    return intervals;
}

module.exports = {
    handlerSwitch
};
