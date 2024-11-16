<template>
  <v-sheet class="card-colour pa-12 login-form-wrapper" rounded>
    <v-card class="mx-auto my-auto px-8 py-8" max-width="344">
      <v-form @submit.prevent="onSubmit">
        <v-text-field
          v-model="userCredentials.email"
          :readonly="loading"
          :rules="[validateEmail, requiredField]"
          class="mb-2"
          label="Email"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="userCredentials.password"
          :readonly="loading"
          :rules="[requiredField]"
          label="Password"
          @input="validatePassword(userCredentials.password)"
          placeholder="Enter your password"
          clearable
        ></v-text-field>
        <v-card class="px-4 py-4" v-if="showPopup">
          Password must contain:
          <ul class="pl-4">
            <li>At least one digit</li>
            <li>At least one lowercase letter</li>
            <li>At least one uppercase letter</li>
            <li>At least one special character</li>
            <li>And be at least 8 characters long</li>
          </ul>
        </v-card>

        <br />
        <v-btn :loading="loading" color="info" size="large" type="submit" variant="elevated" block>
          Sign In
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-facing-decorator'
import type { IUserLogin } from '@/UserTypes'
import { defineComponent } from 'vue'
import { userStore } from '../stores/userStore'
defineComponent({
  name: 'Login'
})

@Component({})
export default class LoginClass extends Vue {
  isUserAuthenticated: boolean = false
  userCredentials: IUserLogin = {
    email: '',
    password: ''
  }

  loading: boolean = false
  showPopup: boolean = false
  authenticationAttempts: number = 0

  _userStore = userStore()
  @Watch('isUserAuthenticated')
  onUserAuthenticatedChange() {
    if (this.isUserAuthenticated === true) {
      this.$router.push({ path: '/' })
    } else {
      this.$router.push({ path: '/login' })
    }
  }

  get requiredField() {
    return (v: string) => !!v || 'This field is required'
  }
  get validateEmail() {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return (v: string) => emailRegex.test(v) || 'E-mail must be valid'
  }

  get validatePassword() {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/

    /* 
    - At least one digit.
    - At least one lowercase letter.
    - At least one uppercase letter.
    - At least one special character from the set !@#$%^&*.
    - Minimum length of 8 characters (you can adjust this value as needed).
    */
    return (v: string) => {
      const testPassword = passwordRegex.test(v)
      if (!testPassword) {
        this.showPopup = true
      } else {
        this.showPopup = false
      }
      return true
    }
  }
  revokeAuthentication() {
    this.isUserAuthenticated = false
    this.authenticationAttempts = 0
    this.userCredentials = {
      email: '',
      password: ''
    }
    this.$router.push('/login')
  }
  async authenticateUser() {
    this.authenticationAttempts++
    if (this.authenticationAttempts > 3) {
      this.revokeAuthentication()
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.userCredentials)
        }
      )

      if (response.status !== 200) {
        return false
      }

      const data = await response.json()
      console.log(data, 'data in object')
      this._userStore.updateAuth(data.isAuthorized)
      this._userStore.setUserName(data.user.name)
      this._userStore.setUserId(data.user.id)

      this.isUserAuthenticated = true
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  onSubmit() {
    console.log('submitted')
    this.authenticateUser()
  }
}
</script>
<style scoped lang="scss">
.login-form-wrapper {
  min-width: 50%;
  max-height: 50%;
  align-content: center;
  &>.card-colour {
    background-color: #212121;
  }
}
.card-colour {
  background-color: #212121;
}
</style>
