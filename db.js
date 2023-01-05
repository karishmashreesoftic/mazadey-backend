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

// const sequelize = new Sequelize(
//     'test',
//     'root',
//     'Ss@12345',
//     {
//         host: 'localhost',
//         dialect: 'mysql',
//         define: {
//             freezeTableName: true
//         }
//     }
// );

sequelize.sync({ force: false }).then(() => {
    console.log('DB Connected....');
}).catch((error) => {
    console.error('Unable to connect to the database : ', error);
});


module.exports = sequelize;