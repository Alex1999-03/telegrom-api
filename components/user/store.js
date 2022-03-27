const Model = require('./model');

function addUser(user) {
    const myUser = new Model(user);
    myUser.save();
}

async function getUsers(filterUser) {
    let filter = { name: filterUser }
    const users = await Model.find(filter.name !== null ? filter : null)
    return users;
}

async function updateName(id, name) {
    const foundUser = await Model.findOne({
        _id: id
    });
    foundUser.name = name;
    const newUser = await foundUser.save();
    return newUser;
}

function removeUser(id) {
    return Model.deleteOne({ _id: id });
}

module.exports = {
    add: addUser,
    list: getUsers,
    updateName: updateName,
    remove: removeUser,
}