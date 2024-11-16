import type { IUser } from '../UserTypes.d.ts';
export default class UserRetrievalService {
    getUsers(): Promise<IUser[]>;
}
