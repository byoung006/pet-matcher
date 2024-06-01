import type { IUser } from '../UserTypes.d.ts';
export default class UserRetrievalService {
    async getUsers(): Promise<IUser[]> {
        return fetch('/api/users').then((response) => {
            return response.json();
        })    
    }
}
