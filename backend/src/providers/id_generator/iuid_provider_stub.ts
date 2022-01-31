/* eslint-disable class-methods-use-this */

import { UniqueIdProvider } from '../../core/authentication/services/unique_id_provider';

export const expectedId = '0000000-0000-0000-0000-000000000000';

export class UuidProviderStub implements UniqueIdProvider {
    generateId(): string {
        return expectedId;
    }
}
