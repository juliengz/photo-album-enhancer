import {
    Model,
    UUID,
    UUIDV4,
    STRING,
    Optional,
} from 'sequelize';
import sequelize from '../sequelize';

interface UserAttributes {
    id: string;
    email: string;
    password: string;
  }

type UserCreationAttributes = Optional<UserAttributes, 'id'>

class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare id: string;

    declare email: string;

    declare password: string;
}

UserModel.init(
    {
        id: {
            primaryKey: true,
            type: UUID,
            defaultValue: UUIDV4,
        },
        email: {
            type: STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: STRING,
            allowNull: false,
            unique: false,
        },
    },
    {
        timestamps: false,
        tableName: 'user',
        sequelize,
    },
);

export default UserModel;
