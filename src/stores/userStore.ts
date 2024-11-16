import { defineStore } from "pinia";

export const userStore = defineStore('user', {
    state: ()=> ({ 
        firstName:'', 
        isAuthenticated:false,
        id:0
    }),
    persist:true, // Uncomment this line if using a persistence plugin
    actions:{
        updateAuth(authRequest:boolean){
            this.isAuthenticated = authRequest;
        },
        setUserName(name:string){
            this.firstName = name;
        },
        setUserId(id:number){
            this.id = id;
        }
    }
})