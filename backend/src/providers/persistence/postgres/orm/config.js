const config = {
    dialect: 'postgres',
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.NODE_ENV === 'test' ? 'db-test' : process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    logging: process.env.NODE_ENV === 'test' ? false : (str) => console.info(str),
    define: {
        freezeTableName: true,
        underscored: true,
    },
    timezone: 'Europe/Paris',
    pool: {
        max: 15,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};

module.exports = config;
