import { Sequelize } from 'sequelize';

// Veritabanı bağlantısı için Sequelize örneğini oluştur
const sequelize = new Sequelize('bmb_db', 'root', 'YeniSifreniz', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // SQL sorgularını konsola yazdırmak istemiyorsanız false yapabilirsiniz
});

export default sequelize;
