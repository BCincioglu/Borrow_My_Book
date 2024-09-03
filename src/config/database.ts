import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'mysql', 
    host: 'localhost',
    username: 'root',
    password: 'YeniSifreniz',
    database: 'borrow_db',
    logging: false,
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

testConnection();

export default sequelize;
