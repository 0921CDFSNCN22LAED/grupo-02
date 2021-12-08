const fs = require("fs");
const path = require("path");

const Users = {
    fileName: path.join(__dirname, "../../data/users.json"),
    getData: function () {
        let users = fs.readFileSync(this.fileName);
        if (users == "") {
            users = [];
        } else {
            users = JSON.parse(users);
        }
        return users;
    },
    saveData: function (data) {
        fs.writeFileSync(this.fileName, JSON.stringify(data, null, " "));
    },
    generateId: function () {
        let posibleIds = [];
        let currentIds = [];
        let users = this.getData();
        for (let user of users) {
            currentIds.push(user.id);
        }
        for (let i = 1; i <= users.length + 1; i++) {
            if (!currentIds.includes(i)) {
                return i;
            }
        }
    },
    findAll: function () {
        return this.getData();
    },
    findByField: function (field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find((user) => user[field] == text);
        return userFound;
    },
    findOneById: function (id) {
        let user = this.getData().find((user) => user.id == Math.floor(id));
        if (id && id % 1 != 0) {
            return user.children[id];
        }
        return user;
    },
    createUser: function (userData, id, old, childData) {
        let allUsers = this.findAll();
        let [userDataBody, userDataFiles] = userData;
        let oldChildren = old.children;
        let newUser = {
            ...old,
            ...userDataBody,
            id: id ? Number(id) : this.generateId(),
            avatar: userDataFiles
                ? userDataFiles.filename
                : old && old.avatar
                ? old.avatar
                : "",
            children: { ...oldChildren, ...childData },
        };
        allUsers.push(newUser);
        this.saveData(allUsers);
        return newUser;
    },
    createSubUser: function (userData) {
        let [userDataBody, userDataFile] = userData;
        let childKey = userDataBody.childId;
        const subUser = {
            [childKey]: {
                ...userDataBody,
                avatar: userDataFile ? userDataFile.filename : "",
            },
        };
        return subUser;
    },
    destroy: function (id) {
        let allUsers = this.findAll();
        allUsers = allUsers.filter((user) => user.id != id);
        this.saveData(allUsers);
    },
    addToCart: function (productId, old) {
        old.cart.push(Number(productId));
        this.destroy(old.id);
        this.createUser("", old.id, old);
    },
    removeFromCart: function (productId, old) {
        cartItems = old.cart.filter((cartItem) => cartItem != productId);
        old.cart = cartItems;
        this.destroy(old.id);
        this.createUser("", old.id, old);
    },
};

module.exports = Users;
