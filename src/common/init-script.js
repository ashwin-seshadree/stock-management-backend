const database = require('../config/database');
const MasterUserRole = require('../models/MasterUserRoles');

(async () => {
    try {
        await database.authenticate();
        await database.sync({ alter: true })
        console.log('✅ MySQL Connection has been established successfully and tables are synced.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
})();