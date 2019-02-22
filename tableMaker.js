const header = {
    importance: 1,
    user: 'user',
    date: 'date',
    comment: 'comment',
    fileName: 'fileName'
};

function printTable(comments) {
    const intervals = findOutColumnsIntervals(comments);
    console.log(
        tableLine(header, intervals) +
            dashLine(intervals) +
            comments.map(comment => tableLine(comment, intervals)).join('') +
            dashLine(intervals)
    );
}

function tableLine({ importance, user, date, comment, fileName }, intervals) {
    return `  ${importance ? '!' : ' '}  \
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

    for (const { user, date, comment, fileName } of comments) {
        intervals.user = Math.max(intervals.user, user.length);
        intervals.date = Math.max(intervals.date, date.length);
        intervals.comment = Math.max(intervals.comment, comment.length);
        intervals.fileName = Math.max(intervals.fileName, fileName.length);
    }

    intervals.user = Math.min(intervals.user, 10);
    intervals.date = Math.min(intervals.date, 10);
    intervals.comment = Math.min(intervals.comment, 50);
    intervals.fileName = Math.min(intervals.fileName, 15);

    return intervals;
}

module.exports = {
    printTable
};
