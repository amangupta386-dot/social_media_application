const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
});

const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true }); // Adjusts tables to match the models
        console.log('Database synced successfully.');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

syncDatabase();

module.exports = sequelize;
