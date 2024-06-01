import { defineStore } from "pinia";

export const userStore = defineStore('user', {
    state: ()=> ({ 
        firstName:'', 
        isAuthenticated:false
    }),
    actions:{
        updateAuth(authRequest:boolean){
            console.log(authRequest, 'whats in the store?')
            this.isAuthenticated = authRequest;
        },
        setUserName(name:string){
            console.log(name, 'what comes into this function')
            this.firstName = name;
        }
    }
})