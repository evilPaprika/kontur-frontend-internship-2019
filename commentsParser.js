const { getFilePathsWithExtension, readFile } = require('./fileSystem');
const path = require('path');

const parseCommentRegExp = /^.*?\/\/ *TODO *:? *((.*) *; *(.*) *;)? *(.*) *$/gim;

function getParsedFromFolder(folder) {
    const filePaths = getFilePathsWithExtension(folder, 'js');
    const allParsedComments = [];
    for (const filePath of filePaths) {
        const parsedComments = parseComments(readFile(filePath));
        parsedComments.forEach(commentObject => {
            commentObject.fileName = path.relative(folder, filePath);
        });
        allParsedComments.push(...parsedComments);
    }
    return allParsedComments;
}

function parseComments(text) {
    const commentObjects = [];
    parseCommentRegExp.lastIndex = 0;
    while ((match = parseCommentRegExp.exec(text)))
        commentObjects.push(makeCommentObject(match));

    return commentObjects;
}

function makeCommentObject([, , user, date, comment]) {
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
