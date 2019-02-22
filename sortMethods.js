function importance(comment_1, comment_2) {
    return comment_2.importance - comment_1.importance;
}

function user(comment_1, comment_2) {
    const user_1 = comment_1.user.toLowerCase();
    const user_2 = comment_2.user.toLowerCase();

    if (user_1 === '') return 1;
    if (user_2 === '') return -1;

    if (user_1 === user_2) return 0;
    return user_1 < user_2 ? -1 : 1;
}

function date(comment_1, comment_2) {
    return comment_1.date.localeCompare(comment_2.date) * -1;
}

module.exports = {
    importance,
    user,
    date
};
