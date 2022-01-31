/* eslint-disable class-methods-use-this */

import { User } from '../../../../core/authentication/domain/models/user';
import { UserRepository } from '../../../../core/authentication/repositories/user_repository';
import { UserMapper } from '../mappers/user_mapper';
import UserModel from '../orm/models/user_model';
import sequelize from '../orm/sequelize';

export class PostgresUserRepository implements UserRepository {
    async persist(user: User): Promise<void> {
        const transaction = await sequelize.transaction();
        try {
            const existingUser = await UserModel.findByPk(user.id);

            if (existingUser) {
                await UserModel.update(UserMapper.toPersistence(user), { where: { id: existingUser.id } });
            } else {
                await UserModel.create(UserMapper.toPersistence(user));
            }

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async findAll(): Promise<User[]> {
        const users = await UserModel.findAll();

        return users.map((user) => UserMapper.toDomain(user));
    }

    async findById(id: string): Promise<User | null> {
        const user = await UserModel.findByPk(id);

        return (user) ? UserMapper.toDomain(user) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ where: { email } });

        return (user) ? UserMapper.toDomain(user) : null;
    }

    async exists(user: User): Promise<boolean> {
        const existingUser = await UserModel.findByPk(user.id);

        return !!(existingUser);
    }
}
