const mysql = require('mysql2');

    // var connection = mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     password: 'Ss@12345',
    //     database: 'test',
    // });

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    process.env.MYSQL_DB,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        define: {
            freezeTableName: true
        }
    }
);

sequelize.sync({ force: false }).then(() => {
    console.log('DB Connected....');
}).catch((error) => {
    console.error('Unable to connect to the database : ', error);
});


    // var connection = mysql.createConnection({
    //     host: process.env.MYSQL_HOST,
    //     user: process.env.MYSQL_USER,
    //     password: process.env.MYSQL_PASSWORD,
    //     database: process.env.MYSQL_DB,
    //     multipleStatements: true
    // });
    
    // connection.connect(function (err) {
    //     console.log('DB Connecting...');
    //     if (err) {
    //         console.error('Error in Connecting : ' + err.stack);
    //     }

    //     console.log('DB Connected as Id :- ' + connection.threadId);
    // });


module.exports = sequelize;
