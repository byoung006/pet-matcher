<template>
  <v-app style="width: 100%">
    <v-app-bar>
      <v-app-bar-title>
        <v-btn variant="text" to="/"> Pet-Matcher</v-btn>
        </v-app-bar-title
      >

      <v-spacer></v-spacer>

      <p v-if="isUserAuthenticated">{{ userStore.firstName }}</p>
      <v-spacer></v-spacer>

      <v-btn v-if="!isUserAuthenticated" to="/signup">Create An Account</v-btn>
      <v-btn v-if="!isUserAuthenticated" to="/login">Login</v-btn>
      <v-btn v-if="isUserAuthenticated" @click="revokeAuthentication()">Logout</v-btn>
    </v-app-bar>
    <div class="view-wrapper">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </v-app>
</template>

<script lang="ts">
import type { IUser } from '@/UserTypes'
import { Component, Vue } from 'vue-facing-decorator'
import UserMatches from './components/UserMatches.vue'
import UserComponent from './pages/User.vue'
import CreateUser from './pages/CreateUser.vue'
import { defineComponent } from 'vue'
import { userStore } from './stores/userStore'
defineComponent({
  name: 'App'
})
@Component({
  components: {
    UserMatches,
    UserComponent,
    CreateUser
  }
})
export default class App extends Vue {
  isUserAuthenticated: boolean = false
  userStore = userStore()
  revokeAuthentication() {
    this.isUserAuthenticated = false
    this.userStore.$state.isAuthenticated = false
    window.sessionStorage.setItem('UserAuthenticated', 'false')
    this.$router.push('/login')
  }
  mounted() {
    this.isUserAuthenticated = Boolean(window.sessionStorage.getItem('UserAuthenticated'))
    this.userStore.$state.firstName = this.userStore.firstName
    console.log(this.isUserAuthenticated, 'auth in frontent?')
  }
}
</script>

<style scoped>
.v-application {
  background-color: var(--vt-c-black-soft) !important;
}
.v-toolbar {
  background-color: var(--vt-c-black-soft) !important;
  color: var(--vt-c-white) !important;
}
.view-wrapper {
  display: flex;
  height: 100%;
  width: 100%;
  top: 5rem;
  position: relative;
  justify-content: center;
  background-color: inherit;
}
</style>
