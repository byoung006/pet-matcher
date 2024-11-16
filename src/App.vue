<template>
  <v-app style="width: 100%">
    <v-app-bar>
      <v-app-bar-title>
        <v-btn variant="text" to="/"> Pet-Matcher</v-btn>
        </v-app-bar-title
      >

      <v-app-bar-title>
        <v-btn variant="text" to="/my-matches"> Your Matches</v-btn>
        </v-app-bar-title>
      <v-spacer></v-spacer>

      <p v-if="userStore.$state.isAuthenticated === true">Welcome {{ userStore.firstName }}!</p>
      <v-btn v-if="userStore.$state.isAuthenticated !== true" to="/signup">Create An Account</v-btn>
      <v-btn v-if="userStore.$state.isAuthenticated !== true" to="/login">Login</v-btn>
      <v-btn v-if="userStore.$state.isAuthenticated === true" @click="revokeAuthentication()">Logout</v-btn>
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
import { Component, Vue, Watch } from 'vue-facing-decorator'
import UserMatches from './components/UserMatches.vue'
import UserComponent from './pages/User.vue'
import CreateUser from './pages/CreateUser.vue'
import { defineComponent } from 'vue'
import { userStore } from './stores/userStore'
import YourMatches from './pages/YourMatches.vue'
defineComponent({
  name: 'App'
})
@Component({
  components: {
    UserMatches,
    UserComponent,
    CreateUser,
    YourMatches
  }
})
export default class App extends Vue {
  isUserAuthenticated: boolean = false
  userStore = userStore()
  mounted(){
    console.log(this.userStore.$state)
  }
  revokeAuthentication() {
    this.userStore.updateAuth(false)
    this.userStore.setUserName('')
    this.$router.push('/login')
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
