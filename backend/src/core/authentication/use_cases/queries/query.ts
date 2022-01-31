/* eslint-disable no-unused-vars */

export interface Query<T, U> {
    execute(payload: T): U
  }
