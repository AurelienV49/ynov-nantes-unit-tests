const helperTodoCreation = (req) => {

    if (!req.body || !req.body.text || req.body.test === '') {
        return false;
    }
    return true;
}

module.exports = { helperTodoCreation }