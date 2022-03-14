module.exports = {
    development: {
        username: 'ba8fd7d5c50cf8',
        password: 'd9dbcbde',
        database: 'heroku_ee8c2601b233ff8',
        host: 'us-cdbr-east-05.cleardb.net',
        dialect: 'mysql',
        logging: false,
    },
    test: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        username: 'root',
        password: null,
        database: 'database_production',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
};
