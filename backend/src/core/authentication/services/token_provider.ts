/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */

export interface TokenProvider {
    generateToken(payload: any): Promise<string>
    verifyToken(token: string): Promise<boolean>
    decodeToken(token: string): any
}
