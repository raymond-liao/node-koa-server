/**
 * Created by raniys on 5/18/17.
 */

const authBase = require('./auth-base');
const Sequelize = require('sequelize');

const UcUser = authBase.define('uc_users', {
    UID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    UserType: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Password: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    NickName: Sequelize.STRING(50),
    Avatar: Sequelize.STRING(256),
    Email: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    Mobile: {
        type: Sequelize.STRING(150),
        allowNull: true,
        unique: true
    }
}, {
    tableName: 'uc_users',
    createdAt: 'CreateTime',
    updatedAt: 'UpdateTime'
});

function findById(user_id) {
    UcUser.findById(user_id).then(project => {
        // project will be an instance of Project and stores the content of the table entry
        // with id 123. if such an entry is not defined you will get null
    })
}

// e.x: attributes: {NickName: "John"}
function findOne(attributes) {
    // search for attributes
    UcUser.findOne({where: attributes}).then(project => {
        // project will be the first entry of the Projects table with the title 'aProject' || null
    })
}

function findAll(attributes) {
    // search for specific attributes - hash usage
    UcUser.findAll({ where: attributes }).then(projects => {
        // projects will be an array of Project instances with the specified name
    })
}

function findAndCountAll(attributes, page_size, page_index) {
    UcUser.findAndCountAll({
        where: {
            attributes
        },
        offset: (page_index - 1) * page_size,
        limit: page_size
    }).then(result => {
        console.log(result.count);
        console.log(result.rows);
    });
}

function createOrUpdate(email, mobile, password, callback) {
    let query;
    if (email) {
        query = {Email: email}
    } else if (mobile) {
        query = {Mobile: mobile}
    }

    UcUser.findOrCreate({where: query, defaults: {UserType: 100, Password: password}})
        .spread((user, created) => {
            console.log(user.get({
                plain: true
            }));
            console.log(created)
        })
}

module.exports = {
    findById: findById,
    findOne: findOne,
    findAll: findAll,
    findAndCountAll: findAndCountAll,
    createOrUpdate: createOrUpdate
};
