function getParsed(files) {
    const comments = [];
    for (const file of files) {
        comments.push(...parseCommentsFromFile(file));
    }
    return comments;
}

function parseCommentsFromFile(file) {
    const comments = [];
    const re = /^(?:[^"]|"[^"]*")*?(\/\/ TODO.*)/gim;
    while ((match = re.exec(file))) {
        const comment = match[1];
        comments.push(comment);
    }

    return comments;
}

function parseComment(comment) {

}

module.exports = {
    getParsed
};
