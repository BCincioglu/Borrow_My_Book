import { Sequelize } from 'sequelize';

// Veritabanı bağlantı bilgileri
const sequelize = new Sequelize({
    dialect: 'mysql', // veya 'postgres', 'sqlite' gibi diğer veritabanı türleri
    host: 'localhost',
    username: 'root',
    password: 'YeniSifreniz',
    database: 'borrow_db',
    logging: false, // Konsola SQL sorgularını yazdırmamak için false
});

// Veritabanı bağlantısını doğrula
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
