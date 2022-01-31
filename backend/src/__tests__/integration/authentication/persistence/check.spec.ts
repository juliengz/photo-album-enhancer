import UserModel from '../../../../providers/persistence/postgres/orm/models/user_model';
import sequelize from '../../../../providers/persistence/postgres/orm/sequelize';

describe('Check if services expected for integration test', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        // Closing the DB connection allows Jest to exit successfully.
        sequelize.close();
    });

    it('should verify pg-test config is ok', async () => {
        expect(sequelize.getDatabaseName()).toBe('db-test');
    });

    it('should not have any object previously created', async () => {
        expect(await UserModel.count()).toBe(0);
    });

    it('should create object correctly', async () => {
        await UserModel.create({
            email: `${Date.now()}@test.fr`, // avoid duplication, we just test db record creation
            password: 'user-password',
        });

        expect(await UserModel.count()).toBe(1);
    });
});
