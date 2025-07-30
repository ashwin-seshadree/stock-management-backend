const database = require('../config/database');

(async () => {
    try {
        await database.authenticate();
        console.log('✅ MySQL Connection has been established successfully');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
})();