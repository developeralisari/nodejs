const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // SQLite dosya konumu
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Veritabanı bağlantısı başarılı!');
  } catch (error) {
    console.error('Bağlantı başarısız:', error);
  }
})();

module.exports = sequelize;
