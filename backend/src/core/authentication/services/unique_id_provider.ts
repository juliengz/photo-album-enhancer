export type Uuid = string;

export interface UniqueIdProvider {
    generateId(): Uuid;
  }
