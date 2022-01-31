/* eslint-disable no-unused-vars */

export interface PasswordHasher {
  hash(plainValue: string): string
  compare(plainValue: string, hash: string): Promise<boolean>
}
