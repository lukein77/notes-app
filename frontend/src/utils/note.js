function limit(string, limit=0) {
    if (string.length > limit) {
        return string.substring(0, limit)+"...";
    }
    return string;
}

export {
    limit
}