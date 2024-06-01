<template>
  <div class="home">
    <h1>Find your new Match!</h1>
    <UserMatches :users="usersArray" @user="handleUserUpdateEvent" />
  </div>
</template>

<script lang="ts">
import type { IUser } from '../UserTypes'
import UserMatches from '@/components/UserMatches.vue'
import { Vue, Prop, Component } from 'vue-facing-decorator'

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
  mounted() {
    this.getUsers()
  }
  user: IUser = {
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
