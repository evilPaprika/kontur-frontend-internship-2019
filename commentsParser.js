const { getFilePathsWithExtension, readFile } = require('./fileSystem');
const path = require('path');

function getParsedFromFolder(folder) {
    const filePaths = getFilePathsWithExtension(folder, 'js');
    const allParsedComments = [];
    for (const filePath of filePaths) {
        const parsedComments = parseComments(readFile(filePath)).map(
            commentObject => {
                commentObject.fileName = path.relative(folder, filePath);
                return commentObject;
            }
        );
        allParsedComments.push(...parsedComments);
    }
    return allParsedComments;
}

const commentsFromFileRegExp = /^(?:[^"]|"[^"]*")*?(\/\/ *TODO.*)/gim;
function parseComments(text) {
    const comments = [];
    commentsFromFileRegExp.lastIndex = 0;
    while ((match = commentsFromFileRegExp.exec(text))) {
        const parsedComment = parseComment(match[1]);
        parsedComment && comments.push(parsedComment);
    }

    return comments;
}

const commentRegExp = /^\/\/ *TODO *((.*) *; *(.*) *;)? *(.*) *$/im;

function parseComment(wholeComment) {
    const parsed = commentRegExp.exec(wholeComment);
    if (!parsed) return;

    const [, , user, date, comment] = parsed;
    return {
        user: user || '',
        date: date || '',
        comment: comment || '',
        importance: (comment.match(/!/g) || []).length
    };
}

module.exports = {
    getParsedFromFolder
};
