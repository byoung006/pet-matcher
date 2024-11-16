export declare const userStore: import("pinia").StoreDefinition<"user", {
    firstName: string;
    isAuthenticated: boolean;
    id: number;
}, {}, {
    updateAuth(authRequest: boolean): void;
    setUserName(name: string): void;
    setUserId(id: number): void;
}>;
