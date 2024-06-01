<template>
  <v-card class="card-container-wrapper">
    <v-list class="card-container">
      <v-list-item v-for="user in userArray" :key="user.name">
        <v-list-item @click="getUser(user.id)" class="card">
          <v-row>
            <v-col>
              <v-list-item-title class="title"
                >{{ user.name }}
                <v-badge v-if="user.isActive" dot color="success">
                  <v-icon>mdi-home-outline</v-icon>
                </v-badge>
              </v-list-item-title>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-list-item-subtitle>{{ user.age }}</v-list-item-subtitle>
              <v-spacer></v-spacer>
              <div class="pet-list-wrapper">
                <div v-if="user.pets" class="pet-list" v-for="(pets, index) in user.pets">
                  <v-list-item-subtitle>{{
                    ` ${pets.petName} • ${pets.petAge} `
                  }}</v-list-item-subtitle>
                  <v-list-item-subtitle>{{
                    ` ${pets.petKind == 'cat' ? '🐱' : '🐶'}`
                  }}</v-list-item-subtitle>
                </div>
                <div v-if="!user.pets.length">No Pets - Yet!</div>
              </div>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list-item>
    </v-list>
  </v-card>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <UserModal
      :show="showModal"
      @match="handleMatchEvent"
      @no-thanks="handleNoThanksEvent"
      :user="user"
    />
  </Teleport>
</template>

<script lang="ts">
import type { IUser } from '@/UserTypes'
import UserModal from './UserModal.vue'
import { Vue, Component, Prop, Watch } from 'vue-facing-decorator'

import { defineComponent } from 'vue'
defineComponent({
  name: 'UserMatches'
})

@Component({
  components: {
    UserModal
  },
  emits: ['user', 'match', 'no-thanks']
})
export default class UserMatches extends Vue {
  @Prop() users: IUser[] = []
  // create a getter to get the users from the prop that is passed into the component
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
  showModal = false
  userMatches = <Record<string, IUser>>{}
  userMatchArray: Array<IUser> = []

  get userArray(): IUser[] {
    return this.users
  }
  // create a watcher to update the userMatches object when the Modal recieves a match event from the child
  handleMatchEvent(user: IUser) {
    this.showModal = false
    this.$emit('match', this.user)
    this.userMatches = { user: this.user }
    console.log(this.userMatches, 'userMatches')
    this.userMatchArray.push(this.userMatches.user)
    console.log(this.userMatchArray, 'userMatchArray')
  }

  handleNoThanksEvent(user: IUser) {
    this.showModal = false
    this.userMatches = { user: this.user }
  }

  public async getUser(id: number): Promise<void> {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        this.user = data
        this.showModal = true
      })
  }
}
</script>

<style scoped lang="scss">
.card-container {
  /** Create styling for cards to flex in a grid 3 wide, taking up 100% the width of the container */
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 1rem;
  row-gap: 1rem;
  background-color: var(--vt-c-black-soft) !important;
}
.card {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  background-color: var(--vt-c-black-mute);
  .title {
    padding: 0.25rem !important;
    color: var(--vt-c-white) !important;
  }
  & .v-col > * {
    color: var(--vt-c-white) !important;
  }
  .pet-list-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem;
    & .pet-list {
      flex-direction: column;
      display: flex;
      flex-wrap: wrap;
      padding: 1rem;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
