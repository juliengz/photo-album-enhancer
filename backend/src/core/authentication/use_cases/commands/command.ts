/* eslint-disable no-unused-vars */

export interface Command<T, U> {
    execute(payload: T): U
  }
