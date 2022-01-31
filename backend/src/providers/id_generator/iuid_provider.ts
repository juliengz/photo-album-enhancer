/* eslint-disable class-methods-use-this */

import { v4 } from 'uuid';
import { UniqueIdProvider } from '../../core/authentication/services/unique_id_provider';

export class UuidProvider implements UniqueIdProvider {
    generateId(): string {
        return v4();
    }
}
