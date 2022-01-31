import { Sequelize } from 'sequelize';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./config');

export default new Sequelize(config);
