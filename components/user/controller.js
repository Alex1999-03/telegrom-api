const store = require('./store')

function addUser(name) {
    if(!name) {
        return new Promise.reject('Invalid name.');
    }
    const user = {
        name,
    };
    store.add(user);
    return Promise.resolve(user);
}

function getUsers(filterUser) {
    return store.list(filterUser);
}

module.exports = {
    addUser,
    getUsers,
}