module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable('user', {
            id: {
                primaryKey: true,
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.DataTypes.UUIDV4,
            },
            email: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                unique: false,
            },
        });
    },

    async down(queryInterface) {
        return queryInterface.dropTable('user');
    },
};
