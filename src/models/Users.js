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
    findOneById: function (id) {
        return this.getData().find((user) => user.id == id);
    },
    createUser: function (userData) {
        let allUsers = this.findAll();
        let [userDataBody, userDataFiles] = userData;
        let newUser = {
            id: this.generateId(),
            ...userDataBody,
        };
        allUsers.push(newUser);
        this.saveData(allUsers);
        return newUser;
    },
};

module.exports = Users;
