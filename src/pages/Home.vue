<template>
  <div class="home">
    <h1>Find your new Match!</h1>
    <UserMatches :users="usersArray"  @match="handleMatchEvent($event)"
      @user="handleUserUpdateEvent" />
  </div>
</template>

<script lang="ts">


import type { IUser } from '../UserTypes'
import UserMatches from '@/components/UserMatches.vue'
import { Vue, Prop, Component } from 'vue-facing-decorator'
import { userStore } from '../stores/userStore'
import { defineComponent } from 'vue'
defineComponent({
  name: 'home-page',
})

@Component({
  components: {
    UserMatches
  }
})
export default class HomeClass extends Vue {
  usersArray: IUser[] = []
   currentUser = userStore() 
  
  user: Omit<IUser, 'email' | 'password' | 'usermatches'> = {
    id: 0,
    name: '',
    age: 0,
    isActive: false,
    pets: [
      {
        petName: '',
        petColor: '',
        petAge: 0,
        petKind: 'dog'
      }
    ]
  }

  mounted() {
    this.getUsers()
  }
  async handleMatchEvent(user: IUser) {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/match/`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id:this.currentUser.$state.id, matchId:user.id})
      }).then((resp)=>{
        console.log(resp, 'resp')
      })
      
    } catch (e) {
      console.log(e as Error)
    }
  }
  handleUpdateMatches(users: IUser[]) {
    console.log(users, 'the updated users matched')
    this.$emit('matches', users)
  }
  handleUserUpdateEvent(user: IUser) {
    this.user = user
    console.log(this.user, 'user')
  }
  private getUsers(): void {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, 'data')
        this.usersArray = data
      })
  }
}
</script>

<style scoped>
.home {
  text-align: center;
  width: 90%;
}
</style>
