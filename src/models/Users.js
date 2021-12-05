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
    createUser: function (userData, id, old) {
        let allUsers = this.findAll();
        let [userDataBody, userDataFiles] = userData;
        let newUser = {
            ...old,
            ...userDataBody,
            id: id ? Number(id) : this.generateId(),
            avatar:
                userDataFiles && userDataFiles.avatar
                    ? userDataFiles.avatar[0].filename
                    : old && old.avatar
                    ? old.avatar
                    : "",
            childAvatar1:
                userDataFiles && userDataFiles.childAvatar1
                    ? userDataFiles.childAvatar1[0].filename
                    : old && old.childAvatar1
                    ? old.childAvatar1
                    : "",
            childAvatar2:
                userDataFiles && userDataFiles.childAvatar2
                    ? userDataFiles.childAvatar2[0].filename
                    : old && old.childAvatar2
                    ? old.childAvatar2
                    : "",
            childAvatar3:
                userDataFiles && userDataFiles.childAvatar3
                    ? userDataFiles.childAvatar3[0].filename
                    : old && old.childAvatar3
                    ? old.childAvatar3
                    : "",
            childAvatar4:
                userDataFiles && userDataFiles.childAvatar4
                    ? userDataFiles.childAvatar4[0].filename
                    : old && old.childAvatar4
                    ? old.childAvatar4
                    : "",
            childAvatar5:
                userDataFiles && userDataFiles.childAvatar5
                    ? userDataFiles.childAvatar5[0].filename
                    : old && old.childAvatar5
                    ? old.childAvatar5
                    : "",
        };
        allUsers.push(newUser);
        this.saveData(allUsers);
        return newUser;
    },
    destroy: function (id) {
        let allUsers = this.findAll();
        allUsers = allUsers.filter((user) => user.id != id);
        this.saveData(allUsers);
    },
};

module.exports = Users;
