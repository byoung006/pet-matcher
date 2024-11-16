import type { IUser } from '../UserTypes';
import type { Request, Response } from 'express';
export default class UserService {
    constructor(req: Request);
    createUserRecord(req: Request, res: Response): Promise<Response<IUser>>;
}
