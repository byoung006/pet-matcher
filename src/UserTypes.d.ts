export type PetBreed = 'dog' | 'cat' | 'other';
export type PetName = string;

export interface PetInfo {
    petName: PetName;
    petColor: string;
    petAge: number;
    petKind: PetBreed;
}

export interface IUser {
    id: number
    name: string;
    age: number;
    email: string;
    password: string;
    isActive: boolean;
    pets: PetInfo[];
}
export interface IUserLogin {
    email: string;
    password: string;
}
